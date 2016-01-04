'use strict';

// Export Settingmenu controller
angular.module('settingmenus').controller('ExportSettingmenusController', ['$scope', '$stateParams', '$location', 'Authentication', 'Settingmenus', '$http', '$q', '$window', 'Download', 'Resource',
  function ($scope, $stateParams, $location, Authentication, Settingmenus, $http, $q, $window, Download, Resource) {
    $scope.authentication = Authentication;

    // init
    var templatePath = "modules/settingmenus/client/template";

    // init export button
    $http.get(templatePath + "/" + "config.json")
        .success(function(response) {
          var templates = response;
          $scope.templates = templates;
        })
        .error(function(error) {
          alert(error);
        });

    // init settingmenu grid
    $scope.settingmenus = Settingmenus.query();
    $scope.settingmenuGridOptions = {
      // Sort
      enableSorting: false,
      // Select
      enableRowSelection: true,
      enableSelectAll: true,
      enableFullRowSelection: true,
      // Export
      exporterCsvFilename: 'myFile.csv',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "Settingmenu", style: 'headerStyle' },
      exporterPdfFooter: function ( currentPage, pageCount ) {
        return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
      },
      exporterPdfCustomFormatter: function ( docDefinition ) {
        docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
        docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
        return docDefinition;
      },
      exporterPdfOrientation: 'portrait',
      exporterPdfPageSize: 'LETTER',
      exporterPdfMaxGridWidth: 500,
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
      // Data
      enableGridMenu: true,
      columnDefs: [
        { field: '_id', enableCellEdit:false },
        { field: 'name' },
        { field: 'selectName' },
        { field: 'iconFile' },
        { field: 'icon1xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="25" height="22" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'icon2xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="49" height="44" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'icon3xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="74" height="65" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconFile' },
        { field: 'selectIcon1xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="25" height="22" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIcon2xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="49" height="44" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIcon3xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="74" height="65" src="{{ COL_FIELD }}" set-row-height /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'settingmenus' };
    $scope.settingmenuGridOptions.onRegisterApi = function (gridApi) {
      $scope.settingmenuGridApi = gridApi;
    };

    $scope.next = function() {
      $scope.exportAllPackage($scope.packages.info.version, $scope.templates)
          .then(function(zipFiles){
            // Put zip to packages
            $scope.packages.feature.nowPage.zipFiles = zipFiles;

            // Goto to next page
            $scope.packages.feature.GotoNextPage();
          });
    };

    $scope.exportAll = function(resourceDirectory) {
      $scope.exportAllPackage(resourceDirectory, $scope.templates)
          .then(function(zipFiles){
            // Create all zip
            var zip = new $window.JSZip();
            for(var i=0;i<zipFiles.length;i++) {
              var zipFile = zipFiles[i];

              var zipFileName = zipFile.name;
              var zipFileZip = zipFile.file;

              var zipFileContent = zipFileZip.generate({type: "base64"});
              zip.file(zipFileName, zipFileContent, {base64: true});
            }

            var content = zip.generate({type: "blob"});
            Download.downloadFile('all.zip', content);
          });
    };

    $scope.export = function(resourceDirectory, template) {
      $scope.exportPackage(resourceDirectory,template)
          .then(function(zipFile){
            var zipFileName = zipFile.name;
            var zipFileZip = zipFile.file;

            var content = zipFileZip.generate({type: "blob"});
            Download.downloadFile(zipFileName, content);
          });
    };

    $scope.exportAllPackage = function(resourceDirectory,templates) {
      // Create zips with templates
      var promises = [];
      for(var i=0;i<templates.length;i++)
      {
        var template=templates[i];
        var promise = $scope.exportPackage(resourceDirectory, template);
        promises.push(promise);
      }

      var deferred = $q.defer();

      // Return zips
      $q.all(promises)
          .then(function(zipFiles) {
            deferred.resolve(zipFiles);
          });

      return deferred.promise;
    };


    $scope.exportPackage = function(resourceDirectory,template) {
      // Config
      var plistTemplateFilePath = templatePath + "/" + template.plistInput;
      var plistFileName = template.plistOutput;
      var zipFileName = template.start + "~" + template.end + "." + "zip";

      // Zip
      var zip = new $window.JSZip();
      var resourceFolder;
      if (resourceDirectory==null) {
        resourceFolder = zip;
      }
      else {
        resourceFolder = zip.folder(resourceDirectory);
      }

      // Create entity file
      var createEntityFile = function (entity) {
        var imagePromises = [];

        // 1. put image into zip
        var icon1xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.icon1xURL, function (err, data) {
          icon1xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.get1xFileName(entity.iconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(icon1xDeferred.promise);
        var icon2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.icon2xURL, function (err, data) {
          icon2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.get2xFileName(entity.iconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(icon2xDeferred.promise);
        var icon3xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.icon3xURL, function (err, data) {
          icon3xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.get3xFileName(entity.iconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(icon3xDeferred.promise);
        var selectIcon1xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.selectIcon1xURL, function (err, data) {
          selectIcon1xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.get1xFileName(entity.selectIconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(selectIcon1xDeferred.promise);
        var selectIcon2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.selectIcon2xURL, function (err, data) {
          selectIcon2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.get2xFileName(entity.selectIconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(selectIcon2xDeferred.promise);
        var selectIcon3xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.selectIcon3xURL, function (err, data) {
          selectIcon3xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.get3xFileName(entity.selectIconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(selectIcon3xDeferred.promise);

        // 2. edit entity settingImageFile
        if (resourceDirectory == null) {
          entity.exportIconFile = entity.iconFile;
        }
        else {
          entity.exportIconFile = resourceDirectory + '/' + entity.iconFile;
        }

        // 2. edit entity settingImageFile
        if (resourceDirectory == null) {
          entity.exportSelectIconFile = entity.selectIconFile;
        }
        else {
          entity.exportSelectIconFile = resourceDirectory + '/' + entity.selectIconFile;
        }

        var deferred = $q.defer();

        $q.all(imagePromises)
            .then(function(results) {
              deferred.resolve(results);
            });

        return deferred.promise;
      };

      var promises = [];
      var rows, i, row, entity, promise;
      // Get select settingmenu
      rows = $scope.settingmenuGridApi.grid.rows;
      for(i=0;i<rows.length;i++)
      {
        row=rows[i];
        if (row.isSelected===true) {
          entity = row.entity;
          promise = createEntityFile(entity);
          promises.push(promise);
        }
      }

      var deferred = $q.defer();

      // Create plist
      $q.all(promises)
          .then(function(results) {
            // 1. get plist template
            $http.get(plistTemplateFilePath)
                .success(function (response) {
                  var plistTemplate = response;

                  // template -> plist
                  var data = {};
                  data.settingmenus = $scope.settingmenus;

                  var plist = $window.microtemplate(plistTemplate, data);

                  // 2. put plist into zip
                  zip.file(plistFileName, plist);

                  deferred.resolve({name: zipFileName, file: zip, template: template});
                })
                .error(function (error) {
                  alert(error);
                });
          });

      return deferred.promise;
    };
  }
]);


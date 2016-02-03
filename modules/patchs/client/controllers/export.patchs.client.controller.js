'use strict';

// Export Patch controller
angular.module('patchs').controller('ExportPatchsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Patchs', '$http', '$q', '$window', 'Download', 'Resource',
  function ($scope, $stateParams, $location, Authentication, Patchs, $http, $q, $window, Download, Resource) {
    $scope.authentication = Authentication;

    // init
    var templatePath = "modules/patchs/client/template";

    // init export button
    $http.get(templatePath + "/" + "config.json")
        .success(function(response) {
          var templates = response;
          $scope.templates = templates;
        })
        .error(function(error) {
          alert(error);
        });

    // init patch grid
    $scope.patchs = Patchs.query();
    $scope.patchGridOptions = {
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
      exporterPdfHeader: { text: "Patch", style: 'headerStyle' },
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
        { field: 'mode' },
        { field: 'script' },
        { field: 'host' },
        { field: 'encrypt' },
        { field: 'scriptFile',
          cellTemplate: '<div class="ui-grid-cell-contents"><a href="{{ COL_FIELD }}" target="_blank">{{ COL_FIELD }}</a></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'patchs' };
    $scope.patchGridOptions.onRegisterApi = function (gridApi) {
      $scope.patchGridApi = gridApi;
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
        var scriptPromises = [];

        // 1. put script into zip
        var bannerImageDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.scriptFile, function (err, data) {
          bannerImageDeferred.resolve(data);
          if (err) {
            throw err;
          }
          resourceFolder.file(entity.name, data, {binary: true});
        });
        scriptPromises.push(bannerImageDeferred.promise);

        // 2. encrypt
        if (entity.encrypt==true)
        {
          //TODO: encrypt
        }

        var deferred = $q.defer();

        $q.all(scriptPromises)
            .then(function(results) {
              deferred.resolve(results);
            });

        return deferred.promise;
      };

      var promises = [];
      var rows, i, row, entity, promise;
      // Get select patch
      rows = $scope.patchGridApi.grid.rows;
      for(i=0;i<rows.length;i++)
      {
        row=rows[i];
        //if (row.isSelected===true) {
          entity = row.entity;
          promise = createEntityFile(entity);
          promises.push(promise);
        //}
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
                  data.patchs = $scope.patchs;

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


'use strict';

// Export Keyboardmenu controller
angular.module('keyboardmenus').controller('ExportKeyboardmenusController', ['$scope', '$stateParams', '$location', 'Authentication', 'Keyboardmenus', '$http', '$q', '$window', 'Download', 'Resource',
  function ($scope, $stateParams, $location, Authentication, Keyboardmenus, $http, $q, $window, Download, Resource) {
    $scope.authentication = Authentication;

    // init
    var templatePath = "modules/keyboardmenus/client/template";

    // init export button
    $http.get(templatePath + "/" + "config.json")
        .success(function(response) {
          var templates = response;
          $scope.templates = templates;
        })
        .error(function(error) {
          alert(error);
        });

    // init keyboardmenu grid
    $scope.keyboardmenus = Keyboardmenus.query();
    $scope.keyboardmenuGridOptions = {
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
      exporterPdfHeader: { text: "Keyboardmenu", style: 'headerStyle' },
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
        { field: '_id', minWidth: '100', enableCellEdit:false },
        { field: 'type', minWidth: '100',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownOptionsArray: [
            { type: 'classic' },
            { type: 'nijigen' }
          ],
          editDropdownIdLabel: 'type',
          editDropdownValueLabel: 'type' },
        { field: 'position', minWidth: '100',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownOptionsArray: [
            { position: 'menu' },
            { position: 'toolbar' }
          ],
          editDropdownIdLabel: 'position',
          editDropdownValueLabel: 'position' },
        { field: 'name' , minWidth: '100' },
        { field: 'title' , minWidth: '100' },
        { field: 'selectTitle' , minWidth: '100' },
        { field: 'iconFile' , minWidth: '100' },
        { field: 'iconiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" set-row-height /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconFile', minWidth: '100' },
        { field: 'selectIconiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconFile', minWidth: '100' },
        { field: 'highlightIconiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconThemeFile', minWidth: '100' },
        { field: 'iconThemeiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconThemeiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconThemeiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconThemeiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconThemeFile', minWidth: '100' },
        { field: 'selectIconThemeiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconThemeiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconThemeiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconThemeiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconThemeFile', minWidth: '100' },
        { field: 'highlightIconThemeiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconThemeiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconThemeiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconThemeiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { name: 'Created User', minWidth: '100', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', minWidth: '100', field: 'created', enableCellEdit:false }
      ],
      data: 'keyboardmenus' };
    $scope.keyboardmenuGridOptions.onRegisterApi = function (gridApi) {
      $scope.keyboardmenuGridApi = gridApi;
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
        var iconiPad1xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.iconiPad1xURL, function (err, data) {
          iconiPad1xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad1xFileName(entity.iconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(iconiPad1xDeferred.promise);
        var iconiPad2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.iconiPad2xURL, function (err, data) {
          iconiPad2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad2xFileName(entity.iconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(iconiPad2xDeferred.promise);
        var iconiPhone2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.iconiPhone2xURL, function (err, data) {
          iconiPhone2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone2xFileName(entity.iconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(iconiPhone2xDeferred.promise);
        var iconiPhone3xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.iconiPhone3xURL, function (err, data) {
          iconiPhone3xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone3xFileName(entity.iconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(iconiPhone3xDeferred.promise);
        var selectIconiPad1xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.selectIconiPad1xURL, function (err, data) {
          selectIconiPad1xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad1xFileName(entity.selectIconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(selectIconiPad1xDeferred.promise);
        var selectIconiPad2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.selectIconiPad2xURL, function (err, data) {
          selectIconiPad2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad2xFileName(entity.selectIconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(selectIconiPad2xDeferred.promise);
        var selectIconiPhone2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.selectIconiPhone2xURL, function (err, data) {
          selectIconiPhone2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone2xFileName(entity.selectIconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(selectIconiPhone2xDeferred.promise);
        var selectIconiPhone3xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.selectIconiPhone3xURL, function (err, data) {
          selectIconiPhone3xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone3xFileName(entity.selectIconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(selectIconiPhone3xDeferred.promise);
        var highlightIconiPad1xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.highlightIconiPad1xURL, function (err, data) {
          highlightIconiPad1xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad1xFileName(entity.highlightIconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(highlightIconiPad1xDeferred.promise);
        var highlightIconiPad2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.highlightIconiPad2xURL, function (err, data) {
          highlightIconiPad2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad2xFileName(entity.highlightIconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(highlightIconiPad2xDeferred.promise);
        var highlightIconiPhone2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.highlightIconiPhone2xURL, function (err, data) {
          highlightIconiPhone2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone2xFileName(entity.highlightIconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(highlightIconiPhone2xDeferred.promise);
        var highlightIconiPhone3xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.highlightIconiPhone3xURL, function (err, data) {
          highlightIconiPhone3xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone3xFileName(entity.highlightIconFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(highlightIconiPhone3xDeferred.promise);

        var iconThemeiPad1xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.iconThemeiPad1xURL, function (err, data) {
          iconThemeiPad1xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad1xFileName(entity.iconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(iconThemeiPad1xDeferred.promise);
        var iconThemeiPad2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.iconThemeiPad2xURL, function (err, data) {
          iconThemeiPad2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad2xFileName(entity.iconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(iconThemeiPad2xDeferred.promise);
        var iconThemeiPhone2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.iconThemeiPhone2xURL, function (err, data) {
          iconThemeiPhone2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone2xFileName(entity.iconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(iconThemeiPhone2xDeferred.promise);
        var iconThemeiPhone3xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.iconThemeiPhone3xURL, function (err, data) {
          iconThemeiPhone3xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone3xFileName(entity.iconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(iconThemeiPhone3xDeferred.promise);
        var selectIconThemeiPad1xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.selectIconThemeiPad1xURL, function (err, data) {
          selectIconThemeiPad1xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad1xFileName(entity.selectIconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(selectIconThemeiPad1xDeferred.promise);
        var selectIconThemeiPad2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.selectIconThemeiPad2xURL, function (err, data) {
          selectIconThemeiPad2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad2xFileName(entity.selectIconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(selectIconThemeiPad2xDeferred.promise);
        var selectIconThemeiPhone2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.selectIconThemeiPhone2xURL, function (err, data) {
          selectIconThemeiPhone2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone2xFileName(entity.selectIconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(selectIconThemeiPhone2xDeferred.promise);
        var selectIconThemeiPhone3xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.selectIconThemeiPhone3xURL, function (err, data) {
          selectIconThemeiPhone3xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone3xFileName(entity.selectIconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(selectIconThemeiPhone3xDeferred.promise);
        var highlightIconThemeiPad1xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.highlightIconThemeiPad1xURL, function (err, data) {
          highlightIconThemeiPad1xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad1xFileName(entity.highlightIconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(highlightIconThemeiPad1xDeferred.promise);
        var highlightIconThemeiPad2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.highlightIconThemeiPad2xURL, function (err, data) {
          highlightIconThemeiPad2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPad2xFileName(entity.highlightIconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(highlightIconThemeiPad2xDeferred.promise);
        var highlightIconThemeiPhone2xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.highlightIconThemeiPhone2xURL, function (err, data) {
          highlightIconThemeiPhone2xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone2xFileName(entity.highlightIconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(highlightIconThemeiPhone2xDeferred.promise);
        var highlightIconThemeiPhone3xDeferred = $q.defer();
        $window.JSZipUtils.getBinaryContent(entity.highlightIconThemeiPhone3xURL, function (err, data) {
          highlightIconThemeiPhone3xDeferred.resolve(data);
          if (err) {
            throw err;
          }
          var fileName = Resource.getiPhone3xFileName(entity.highlightIconThemeFile);
          resourceFolder.file(fileName, data, {binary: true});
        });
        imagePromises.push(highlightIconThemeiPhone3xDeferred.promise);


        // 2. edit entity image file
        if (resourceDirectory == null) {
          entity.exportIconFile = entity.iconFile;
          entity.exportSelectIconFile = entity.selectIconFile;
          entity.exportHighlightIconFile = entity.highlightIconFile;
          entity.exportIconThemeFile = entity.iconThemeFile;
          entity.exportSelectIconThemeFile = entity.selectIconThemeFile;
          entity.exportHighlightIconThemeFile = entity.highlightIconThemeFile;
        }
        else {
          entity.exportIconFile = resourceDirectory + '/' + entity.iconFile;
          entity.exportSelectIconFile = resourceDirectory + '/' + entity.selectIconFile;
          entity.exportHighlightIconFile = resourceDirectory + '/' + entity.highlightIconFile;
          entity.exportIconThemeFile = resourceDirectory + '/' + entity.iconThemeFile;
          entity.exportSelectIconThemeFile = resourceDirectory + '/' + entity.selectIconThemeFile;
          entity.exportHighlightIconThemeFile = resourceDirectory + '/' + entity.highlightIconThemeFile;
        }

        var deferred = $q.defer();

        $q.all(imagePromises)
            .then(function(results) {
              deferred.resolve(results);
            });

        return deferred.promise;
      };

      // Create entity plist
      var createEntityPlist = function (inputFilePath,outputFileName,data) {
        var deferred = $q.defer();

        // 1. get plist template
        $http.get(inputFilePath)
            .success(function (response) {
              var plistTemplate = response;

              // template -> plist
              var plist = $window.microtemplate(plistTemplate, data);

              // 2. put plist into zip
              zip.file(outputFileName, plist);

              deferred.resolve(plist);
            })
            .error(function (error) {
              alert(error);
            });

        return deferred.promise;
      };

      var promises = [];
      var rows, i, row, entity, promise;
      // Get select keyboardmenu
      rows = $scope.keyboardmenuGridApi.grid.rows;
      for(i=0;i<rows.length;i++)
      {
        row=rows[i];
        if (row.isSelected===true) {
          entity = row.entity;
          promise = createEntityFile(entity);
          promises.push(promise);
        }
      }
      // Get plist
      var data = {};
      data.keyboardmenus = $scope.keyboardmenus;
      if (template.start=='5.5') {// 5.5
        var menuPlistTemplateFilePath = templatePath + "/" + template.menuPlistInput;
        var menuPlistFileName = template.menuPlistOutput;
        promise = createEntityPlist(menuPlistTemplateFilePath,menuPlistFileName,data);
        promises.push(promise);

        var toolbarPlistTemplateFilePath = templatePath + "/" + template.toolbarPlistInput;
        var toolbarPlistFileName = template.toolbarPlistOutput;
        promise = createEntityPlist(toolbarPlistTemplateFilePath,toolbarPlistFileName,data);
        promises.push(promise);
      }
      else {// 7.0
        var classicPlistTemplateFilePath = templatePath + "/" + template.classicPlistInput;
        var classicPlistFileName = template.classicPlistOutput;
        promise = createEntityPlist(classicPlistTemplateFilePath,classicPlistFileName,data);
        promises.push(promise);

        var nijigenPlistTemplateFilePath = templatePath + "/" + template.nijigenPlistInput;
        var nijigenPlistFileName = template.nijigenPlistOutput;
        promise = createEntityPlist(nijigenPlistTemplateFilePath,nijigenPlistFileName,data);
        promises.push(promise);
      }

      var deferred = $q.defer();

      // Create plist
      $q.all(promises)
          .then(function(results) {
            deferred.resolve({name: zipFileName, file: zip, template: template});
          });

      return deferred.promise;
    };
  }
]);


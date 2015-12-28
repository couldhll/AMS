'use strict';

// Manage Customkey controller
angular.module('customkeys').controller('ManageCustomkeysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Customkeys', 'ImageUploader', '$window', '$timeout',
  function ($scope, $stateParams, $location, Authentication, Customkeys, ImageUploader, $window, $timeout) {
    $scope.authentication = Authentication;

    $scope.customkeys = Customkeys.query();

    // Uploader
    $scope.uploader = ImageUploader.uploader;
    $scope.uploadPicture = function () {
      ImageUploader.uploadPicture();
    };
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Update image url
      var customkey = response;
      $scope.uploaderCustomkey.settingImage2xURL = customkey.settingImage2xURL;
      $scope.uploaderCustomkey.keyboardImage2xURL = customkey.keyboardImage2xURL;
    };

    // Init customkey
    $scope.customkeyGridOptions = {
      // Sort
      enableSorting: true,
      // Select
      enableRowSelection: true,
      multiSelect: false,
      modifierKeysToMultiSelect: false,
      noUnselect: true,
      enableFullRowSelection: true,
      // Export
      exporterCsvFilename: 'myFile.csv',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "Customkey", style: 'headerStyle' },
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
      rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
      columnDefs: [
        { field: '_id', enableCellEdit:false },
        { field: 'name' },
        { field: 'settingImage2xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="40" height="40" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'keyboardImage2xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="40" height="40" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'data' };
    $scope.addCustomkey = function() {
      var customkeys=$scope.customkeys;
      var selectCustomkeyGroup=$scope.selectCustomkeyGroup;
      var n = customkeys.length + 1;

      // add
      var customkey = new Customkeys({
        name: n,
        index: n,
        group: selectCustomkeyGroup
      });
      customkey.$save(function (response) {
        // show
        var customkey = response;
        customkeys.push(customkey);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.removeCustomkey = function(removeEntity) {
      var customkey = removeEntity;
    };
    $scope.beginEditCustomkey = function(rowEntity, colDef, triggerEvent) {
      var customkey = rowEntity;

      if (colDef.field=='settingImage2xURL') {
        $scope.uploader.url = '/api/customkeys/' + customkey._id + '/settingImage2x';
      }
      else if(colDef.field=='keyboardImage2xURL') {
        $scope.uploader.url = '/api/customkeys/' + customkey._id + '/keyboardImage2x';
      }

      $scope.uploaderCustomkey = customkey;
    };
    $scope.afterEditCustomkey = function(rowEntity, colDef, newValue, oldValue) {
      var customkey = rowEntity;
      if (colDef.name=='Group')
      {
        var groupId = newValue;
        var customkeyGroups=$scope.customkeyGroups;

        // find group with id
        var group = null;
        for(var i=0;i<customkeyGroups.length;i++) {
          var customkeyGroup = customkeyGroups[i];
          if (customkeyGroup._id == groupId) {
            group = customkeyGroup;
            break;
          }
        }

        customkey.group=group;
      }
    };
    $scope.importCustomkey = function(grid, newObjects) {
      var customkeys=$scope.customkeys;
      var selectCustomkeyGroup=$scope.selectCustomkeyGroup;
      var newCustomkeys=newObjects;

      var importSuccessCallback = function (response) {
        // show
        var customkey = response;
        customkeys.push(customkey);
      };
      var importErrorCallback = function (errorResponse) {
        $scope.error = errorResponse.data.message;
      };

      // add
      for(var i=0;i<newCustomkeys.length;i++) {
        var newCustomkey = newCustomkeys[i];
        var n = customkeys.length + 1 + i;

        var customkey = new Customkeys({
          name: newCustomkey.name,
          index: n,
          group: selectCustomkeyGroup
        });
        customkey.$save(importSuccessCallback, importErrorCallback);
      }
    };
  }
]);

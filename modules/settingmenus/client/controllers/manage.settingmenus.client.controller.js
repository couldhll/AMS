'use strict';

// Manage Settingmenu controller
angular.module('settingmenus').controller('ManageSettingmenusController', ['$scope', '$stateParams', '$location', 'Authentication', 'Settingmenus', 'ImageUploader', '$window', '$timeout',
  function ($scope, $stateParams, $location, Authentication, Settingmenus, ImageUploader, $window, $timeout) {
    $scope.authentication = Authentication;

    $scope.settingmenus = Settingmenus.query();

    // Uploader
    $scope.uploader = ImageUploader.uploader;
    $scope.uploadPicture = function () {
      ImageUploader.uploadPicture();
    };
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Update image url
      var settingmenu = response;
      $scope.uploaderSettingmenu.icon1xURL = settingmenu.icon1xURL;
      $scope.uploaderSettingmenu.icon2xURL = settingmenu.icon2xURL;
      $scope.uploaderSettingmenu.icon3xURL = settingmenu.icon3xURL;
      $scope.uploaderSettingmenu.selectIcon1xURL = settingmenu.selectIcon1xURL;
      $scope.uploaderSettingmenu.selectIcon2xURL = settingmenu.selectIcon2xURL;
      $scope.uploaderSettingmenu.selectIcon3xURL = settingmenu.selectIcon3xURL;
    };

    // Init settingmenu
    $scope.settingmenuGridOptions = {
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
      rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
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
      data: 'data' };
    $scope.addSettingmenu = function() {
      var settingmenus=$scope.settingmenus;
      var selectSettingmenuGroup=$scope.selectSettingmenuGroup;
      var n = settingmenus.length + 1;

      // add
      var settingmenu = new Settingmenus({
        name: n,
        index: n,
        group: selectSettingmenuGroup
      });
      settingmenu.$save(function (response) {
        // show
        var settingmenu = response;
        settingmenus.push(settingmenu);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.removeSettingmenu = function(removeEntity) {
      var settingmenu = removeEntity;
    };
    $scope.beginEditSettingmenu = function(rowEntity, colDef, triggerEvent) {
      var settingmenu = rowEntity;

      if (colDef.field=='icon1xURL') {
        $scope.uploader.url = '/api/settingmenus/' + settingmenu._id + '/icon1x';
      }
      else if(colDef.field=='icon2xURL') {
        $scope.uploader.url = '/api/settingmenus/' + settingmenu._id + '/icon2x';
      }
      else if(colDef.field=='icon3xURL') {
        $scope.uploader.url = '/api/settingmenus/' + settingmenu._id + '/icon3x';
      }
      else if(colDef.field=='selectIcon1xURL') {
        $scope.uploader.url = '/api/settingmenus/' + settingmenu._id + '/selectIcon1x';
      }
      else if(colDef.field=='selectIcon2xURL') {
        $scope.uploader.url = '/api/settingmenus/' + settingmenu._id + '/selectIcon2x';
      }
      else if(colDef.field=='selectIcon3xURL') {
        $scope.uploader.url = '/api/settingmenus/' + settingmenu._id + '/selectIcon3x';
      }

      $scope.uploaderSettingmenu = settingmenu;
    };
    $scope.afterEditSettingmenu = function(rowEntity, colDef, newValue, oldValue) {
      var settingmenu = rowEntity;
      if (colDef.name=='Group')
      {
        var groupId = newValue;
        var settingmenuGroups=$scope.settingmenuGroups;

        // find group with id
        var group = null;
        for(var i=0;i<settingmenuGroups.length;i++) {
          var settingmenuGroup = settingmenuGroups[i];
          if (settingmenuGroup._id == groupId) {
            group = settingmenuGroup;
            break;
          }
        }

        settingmenu.group=group;
      }
    };
    $scope.importSettingmenu = function(grid, newObjects) {
      var settingmenus=$scope.settingmenus;
      var selectSettingmenuGroup=$scope.selectSettingmenuGroup;
      var newSettingmenus=newObjects;

      var importSuccessCallback = function (response) {
        // show
        var settingmenu = response;
        settingmenus.push(settingmenu);
      };
      var importErrorCallback = function (errorResponse) {
        $scope.error = errorResponse.data.message;
      };

      // add
      for(var i=0;i<newSettingmenus.length;i++) {
        var newSettingmenu = newSettingmenus[i];
        var n = settingmenus.length + 1 + i;

        var settingmenu = new Settingmenus({
          name: newSettingmenu.name,
          index: n,
          group: selectSettingmenuGroup
        });
        settingmenu.$save(importSuccessCallback, importErrorCallback);
      }
    };
  }
]);

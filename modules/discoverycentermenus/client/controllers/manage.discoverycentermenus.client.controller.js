'use strict';

// Manage Discoverycentermenu controller
angular.module('discoverycentermenus').controller('ManageDiscoverycentermenusController', ['$scope', '$stateParams', '$location', 'Authentication', 'Discoverycentermenus', 'ImageUploader', '$window', '$timeout',
  function ($scope, $stateParams, $location, Authentication, Discoverycentermenus, ImageUploader, $window, $timeout) {
    $scope.authentication = Authentication;

    $scope.discoverycentermenus = Discoverycentermenus.query();

    // Uploader
    $scope.uploader = ImageUploader.uploader;
    $scope.uploadPicture = function () {
      ImageUploader.uploadPicture();
    };
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Update image url
      var discoverycentermenu = response;
      $scope.uploaderDiscoverycentermenu.icon1xURL = discoverycentermenu.icon1xURL;
      $scope.uploaderDiscoverycentermenu.icon2xURL = discoverycentermenu.icon2xURL;
      $scope.uploaderDiscoverycentermenu.icon3xURL = discoverycentermenu.icon3xURL;
    };

    // Init discoverycentermenu
    $scope.discoverycentermenuGridOptions = {
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
      exporterPdfHeader: { text: "Discoverycentermenu", style: 'headerStyle' },
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
        { field: 'title' },
        { field: 'detail' },
        { field: 'iconFile' },
        { field: 'icon1xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="35" height="35" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'icon2xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="70" height="70" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'icon3xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="105" height="105" src="{{ COL_FIELD }}" set-row-height /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'data' };
    $scope.addDiscoverycentermenu = function() {
      var discoverycentermenus=$scope.discoverycentermenus;
      var selectDiscoverycentermenuGroup=$scope.selectDiscoverycentermenuGroup;
      var n = discoverycentermenus.length + 1;

      // add
      var discoverycentermenu = new Discoverycentermenus({
        name: n,
        title: n,
        index: n,
        group: selectDiscoverycentermenuGroup
      });
      discoverycentermenu.$save(function (response) {
        // show
        var discoverycentermenu = response;
        discoverycentermenus.push(discoverycentermenu);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.removeDiscoverycentermenu = function(removeEntity) {
      var discoverycentermenu = removeEntity;
    };
    $scope.beginEditDiscoverycentermenu = function(rowEntity, colDef, triggerEvent) {
      var discoverycentermenu = rowEntity;

      if (colDef.field=='icon1xURL') {
        $scope.uploader.url = '/api/discoverycentermenus/' + discoverycentermenu._id + '/icon1x';
      }
      else if(colDef.field=='icon2xURL') {
        $scope.uploader.url = '/api/discoverycentermenus/' + discoverycentermenu._id + '/icon2x';
      }
      else if(colDef.field=='icon3xURL') {
        $scope.uploader.url = '/api/discoverycentermenus/' + discoverycentermenu._id + '/icon3x';
      }

      $scope.uploaderDiscoverycentermenu = discoverycentermenu;
    };
    $scope.afterEditDiscoverycentermenu = function(rowEntity, colDef, newValue, oldValue) {
      var discoverycentermenu = rowEntity;
      if (colDef.name=='Group')
      {
        var groupId = newValue;
        var discoverycentermenuGroups=$scope.discoverycentermenuGroups;

        // find group with id
        var group = null;
        for(var i=0;i<discoverycentermenuGroups.length;i++) {
          var discoverycentermenuGroup = discoverycentermenuGroups[i];
          if (discoverycentermenuGroup._id == groupId) {
            group = discoverycentermenuGroup;
            break;
          }
        }

        discoverycentermenu.group=group;
      }
    };
    $scope.importDiscoverycentermenu = function(grid, newObjects) {
      var discoverycentermenus=$scope.discoverycentermenus;
      var selectDiscoverycentermenuGroup=$scope.selectDiscoverycentermenuGroup;
      var newDiscoverycentermenus=newObjects;

      var importSuccessCallback = function (response) {
        // show
        var discoverycentermenu = response;
        discoverycentermenus.push(discoverycentermenu);
      };
      var importErrorCallback = function (errorResponse) {
        $scope.error = errorResponse.data.message;
      };

      // add
      for(var i=0;i<newDiscoverycentermenus.length;i++) {
        var newDiscoverycentermenu = newDiscoverycentermenus[i];
        var n = discoverycentermenus.length + 1 + i;

        var discoverycentermenu = new Discoverycentermenus({
          name: newDiscoverycentermenu.name,
          title: newDiscoverycentermenu.title,
          index: n,
          group: selectDiscoverycentermenuGroup
        });
        discoverycentermenu.$save(importSuccessCallback, importErrorCallback);
      }
    };
  }
]);

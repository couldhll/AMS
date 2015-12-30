'use strict';

// Manage Discoverycenterbanner controller
angular.module('discoverycenterbanners').controller('ManageDiscoverycenterbannersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Discoverycenterbanners', 'ImageUploader', '$window', '$timeout',
  function ($scope, $stateParams, $location, Authentication, Discoverycenterbanners, ImageUploader, $window, $timeout) {
    $scope.authentication = Authentication;

    $scope.discoverycenterbanners = Discoverycenterbanners.query();

    // Uploader
    $scope.uploader = ImageUploader.uploader;
    $scope.uploadPicture = function () {
      ImageUploader.uploadPicture();
    };
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Update image url
      var discoverycenterbanner = response;
      $scope.uploaderDiscoverycenterbanner.bannerImage1xURL = discoverycenterbanner.bannerImage1xURL;
    };

    // Init discoverycenterbanner
    $scope.discoverycenterbannerGridOptions = {
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
      exporterPdfHeader: { text: "Discoverycenterbanner", style: 'headerStyle' },
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
        { field: 'openUrl' },
        { field: 'bannerImageFile' },
        { field: 'bannerImage1xURL',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="69" height="39" src="{{ COL_FIELD }}" set-row-height /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'data' };
    $scope.addDiscoverycenterbanner = function() {
      var discoverycenterbanners=$scope.discoverycenterbanners;
      var selectDiscoverycenterbannerGroup=$scope.selectDiscoverycenterbannerGroup;
      var n = discoverycenterbanners.length + 1;

      // add
      var discoverycenterbanner = new Discoverycenterbanners({
        openUrl: n,
        index: n,
        group: selectDiscoverycenterbannerGroup
      });
      discoverycenterbanner.$save(function (response) {
        // show
        var discoverycenterbanner = response;
        discoverycenterbanners.push(discoverycenterbanner);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.removeDiscoverycenterbanner = function(removeEntity) {
      var discoverycenterbanner = removeEntity;
    };
    $scope.beginEditDiscoverycenterbanner = function(rowEntity, colDef, triggerEvent) {
      var discoverycenterbanner = rowEntity;

      if (colDef.field=='bannerImage1xURL') {
        $scope.uploader.url = '/api/discoverycenterbanners/' + discoverycenterbanner._id + '/bannerImage1x';
      }

      $scope.uploaderDiscoverycenterbanner = discoverycenterbanner;
    };
    $scope.afterEditDiscoverycenterbanner = function(rowEntity, colDef, newValue, oldValue) {
      var discoverycenterbanner = rowEntity;
      if (colDef.name=='Group')
      {
        var groupId = newValue;
        var discoverycenterbannerGroups=$scope.discoverycenterbannerGroups;

        // find group with id
        var group = null;
        for(var i=0;i<discoverycenterbannerGroups.length;i++) {
          var discoverycenterbannerGroup = discoverycenterbannerGroups[i];
          if (discoverycenterbannerGroup._id == groupId) {
            group = discoverycenterbannerGroup;
            break;
          }
        }

        discoverycenterbanner.group=group;
      }
    };
    $scope.importDiscoverycenterbanner = function(grid, newObjects) {
      var discoverycenterbanners=$scope.discoverycenterbanners;
      var selectDiscoverycenterbannerGroup=$scope.selectDiscoverycenterbannerGroup;
      var newDiscoverycenterbanners=newObjects;

      var importSuccessCallback = function (response) {
        // show
        var discoverycenterbanner = response;
        discoverycenterbanners.push(discoverycenterbanner);
      };
      var importErrorCallback = function (errorResponse) {
        $scope.error = errorResponse.data.message;
      };

      // add
      for(var i=0;i<newDiscoverycenterbanners.length;i++) {
        var newDiscoverycenterbanner = newDiscoverycenterbanners[i];
        var n = discoverycenterbanners.length + 1 + i;

        var discoverycenterbanner = new Discoverycenterbanners({
          openUrl: newDiscoverycenterbanner.openUrl,
          index: n,
          group: selectDiscoverycenterbannerGroup
        });
        discoverycenterbanner.$save(importSuccessCallback, importErrorCallback);
      }
    };
  }
]);

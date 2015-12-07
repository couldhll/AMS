'use strict';

// Manage Superword controller
angular.module('superwords').controller('ManageSuperwordsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Superwords', 'SuperwordGroups', 'FileUploader', '$window', '$timeout',
  function ($scope, $stateParams, $location, Authentication, Superwords, SuperwordGroups, FileUploader, $window, $timeout) {
    $scope.authentication = Authentication;

    $scope.superwordGroups = SuperwordGroups.query();

    // Config group grid
    $scope.groupGridOptions = {
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
      exporterPdfHeader: { text: "Superword Group", style: 'headerStyle' },
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
        { field: 'title' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }],
      data: 'superwordGroups' };
    $scope.groupGridOptions.onRegisterApi = function (gridApi) {
      $scope.groupGridApi = gridApi;
      gridApi.edit.on.beginCellEdit($scope,function(rowEntity, colDef, triggerEvent) {
        var superwordGroup = rowEntity;
      });

      gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
        var superwordGroup = rowEntity;

        superwordGroup.$update();
        $scope.$apply();
      });
      gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
        var superwordGroups=$scope.superwordGroups;
        for(var i=0;i<superwordGroups.length;i++)
        {
          var superwordGroup=superwordGroups[i];
          superwordGroup.index=i;
          superwordGroup.$update();
        }
      });
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.selectSuperwordGroup = row.entity;

        $scope.superwords = Superwords.getFromGroup({
          superwordGroupId: row.entity._id
        });

        //// reset group dropdown data, to fix the bug
        $scope.superwordGridOptions.columnDefs[2].editDropdownOptionsArray = $scope.superwordGroups;
      });
    };

    // Config superword grid
    $scope.superwordGridOptions = {
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
      exporterPdfHeader: { text: "Superword", style: 'headerStyle' },
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
        { field: 'pattern' },
        { field: 'title' },
        { name: 'Group',
          field: 'group._id',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          cellFilter: 'mapGroup:row.entity.group.title',
          editDropdownOptionsArray: $scope.superwordGroups,
          editDropdownIdLabel: '_id',
          editDropdownValueLabel: 'title' },
        { field: 'head' },
        { field: 'tail' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'superwords' };
    $scope.superwordGridOptions.importerDataAddCallback = function(grid, newObjects) {
      var superwords=$scope.superwords;
      var selectSuperwordGroup=$scope.selectSuperwordGroup;
      var newSuperwords=newObjects;

      var importSuccessCallback = function (response) {
        // show
        var superword = response;
        superwords.push(superword);
      };
      var importErrorCallback = function (errorResponse) {
        $scope.error = errorResponse.data.message;
      };

      // add
      for(var i=0;i<newSuperwords.length;i++) {
        var newSuperword = newSuperwords[i];
        var n = superwords.length + 1 + i;

        var superword = new Superwords({
          title: newSuperword.title,
          index: n,
          group: selectSuperwordGroup
        });
        superword.$save(importSuccessCallback, importErrorCallback);
      }
    };
    $scope.superwordGridOptions.onRegisterApi = function (gridApi) {
      $scope.superwordGridApi = gridApi;
      gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
        var superword = rowEntity;
        if (colDef.name=='Group')
        {
          var groupId = newValue;
          var superwordGroups=$scope.superwordGroups;

          // find group with id
          var group = null;
          for(var i=0;i<superwordGroups.length;i++) {
            var superwordGroup = superwordGroups[i];
            if (superwordGroup._id == groupId) {
              group = superwordGroup;
              break;
            }
          }

          superword.group=group;
        }
        superword.$update();

        $scope.$apply();
      });
      gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
        var superwords=$scope.superwords;
        for(var i=0;i<superwords.length;i++)
        {
          var superword=$scope.superwords[i];
          superword.index=i;
          superword.$update();
        }
      });
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.selectSuperword = row.entity;
      });
    };

    $scope.addGroup = function() {
      var superwordGroups=$scope.superwordGroups;
      var n = superwordGroups.length + 1;

      // add
      var superwordGroup = new SuperwordGroups({
        title: "Group " + n,
        index: n
      });
      superwordGroup.$save(function (response) {
        // show
        var superwordGroup=response;
        superwordGroups.push(superwordGroup);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.removeGroup = function() {
      var superwordGroups=$scope.superwordGroups;

      // remove
      var selectSuperwordGroup=$scope.selectSuperwordGroup;
      selectSuperwordGroup.$remove();

      // show
      for(var i=0;i<superwordGroups.length;i++) {
        var superwordGroup = superwordGroups[i];
        if (superwordGroup == selectSuperwordGroup) {
          superwordGroups.splice(i, 1);
        }
      }

      selectSuperwordGroup=null;
    };

    $scope.addSuperword = function() {
      var superwords=$scope.superwords;
      var selectSuperwordGroup=$scope.selectSuperwordGroup;
      var n = superwords.length + 1;

      // add
      var superword = new Superwords({
        pattern: "Pattern " + n,
        title: "Title " + n,
        index: n,
        group: selectSuperwordGroup
      });
      superword.$save(function (response) {
        // show
        var superword = response;
        superwords.push(superword);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.removeSuperword = function() {
      var superwords=$scope.superwords;

      // remove
      var selectSuperword=$scope.selectSuperword;
      selectSuperword.$remove();

      // show
      for(var i=0;i<superwords.length;i++) {
        var superword = superwords[i];
        if (superword == selectSuperword) {
          superwords.splice(i, 1);
        }
      }

      selectSuperword=null;
    };
  }
]);

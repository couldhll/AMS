'use strict';

// Manage Spotlight controller
angular.module('spotlights').controller('ManageSpotlightsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Spotlights', 'FileUploader', '$window', '$timeout',
  function ($scope, $stateParams, $location, Authentication, Spotlights, FileUploader, $window, $timeout) {
    $scope.authentication = Authentication;

    $scope.spotlights = Spotlights.query();

    // Init spotlight
    $scope.spotlightGridOptions = {
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
      exporterPdfHeader: { text: "Spotlight", style: 'headerStyle' },
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
        { field: 'content' },
        { field: 'url' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'data' };
    $scope.addSpotlight = function() {
      var spotlights=$scope.spotlights;
      var selectSpotlightGroup=$scope.selectSpotlightGroup;
      var n = spotlights.length + 1;

      // add
      var spotlight = new Spotlights({
        title: "Spotlight " + n,
        index: n,
        group: selectSpotlightGroup
      });
      spotlight.$save(function (response) {
        // show
        var spotlight = response;
        spotlights.push(spotlight);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.removeSpotlight = function(removeEntity) {
      var spotlight = removeEntity;
    };
    $scope.afterEditSpotlight = function(rowEntity, colDef, newValue, oldValue) {
      var spotlight = rowEntity;
      if (colDef.name=='Group')
      {
        var groupId = newValue;
        var spotlightGroups=$scope.spotlightGroups;

        // find group with id
        var group = null;
        for(var i=0;i<spotlightGroups.length;i++) {
          var spotlightGroup = spotlightGroups[i];
          if (spotlightGroup._id == groupId) {
            group = spotlightGroup;
            break;
          }
        }

        spotlight.group=group;
      }
    };
    $scope.importSpotlight = function(grid, newObjects) {
      var spotlights=$scope.spotlights;
      var selectSpotlightGroup=$scope.selectSpotlightGroup;
      var newSpotlights=newObjects;

      var importSuccessCallback = function (response) {
        // show
        var spotlight = response;
        spotlights.push(spotlight);
      };
      var importErrorCallback = function (errorResponse) {
        $scope.error = errorResponse.data.message;
      };

      // add
      for(var i=0;i<newSpotlights.length;i++) {
        var newSpotlight = newSpotlights[i];
        var n = spotlights.length + 1 + i;

        var spotlight = new Spotlights({
          title: newSpotlight.title,
          index: n,
          group: selectSpotlightGroup
        });
        spotlight.$save(importSuccessCallback, importErrorCallback);
      }
    };
  }
]);

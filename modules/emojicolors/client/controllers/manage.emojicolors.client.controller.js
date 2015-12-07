'use strict';

// Manage Emojicolor controller
angular.module('emojicolors').controller('ManageEmojicolorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emojicolors', 'FileUploader', '$window', '$timeout',
  function ($scope, $stateParams, $location, Authentication, Emojicolors, FileUploader, $window, $timeout) {
    $scope.authentication = Authentication;

    $scope.emojicolors = Emojicolors.query();

    // Init emojicolor
    $scope.emojicolorGridOptions = {
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
      exporterPdfHeader: { text: "Emojicolor", style: 'headerStyle' },
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
        { field: 'color' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'data' };
    $scope.addEmojicolor = function() {
      var emojicolors=$scope.emojicolors;
      var selectEmojicolorGroup=$scope.selectEmojicolorGroup;
      var n = emojicolors.length + 1;

      // add
      var emojicolor = new Emojicolors({
        title: "Emojicolor " + n,
        color: -1,
        index: n,
        group: selectEmojicolorGroup
      });
      emojicolor.$save(function (response) {
        // show
        var emojicolor = response;
        emojicolors.push(emojicolor);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.removeEmojicolor = function(removeEntity) {
      var emojicolor = removeEntity;
    };
    $scope.afterEditEmojicolor = function(rowEntity, colDef, newValue, oldValue) {
      var emojicolor = rowEntity;
      if (colDef.name=='Group')
      {
        var groupId = newValue;
        var emojicolorGroups=$scope.emojicolorGroups;

        // find group with id
        var group = null;
        for(var i=0;i<emojicolorGroups.length;i++) {
          var emojicolorGroup = emojicolorGroups[i];
          if (emojicolorGroup._id == groupId) {
            group = emojicolorGroup;
            break;
          }
        }

        emojicolor.group=group;
      }
    };
    $scope.importEmojicolor = function(grid, newObjects) {
      var emojicolors=$scope.emojicolors;
      var selectEmojicolorGroup=$scope.selectEmojicolorGroup;
      var newEmojicolors=newObjects;

      var importSuccessCallback = function (response) {
        // show
        var emojicolor = response;
        emojicolors.push(emojicolor);
      };
      var importErrorCallback = function (errorResponse) {
        $scope.error = errorResponse.data.message;
      };

      // add
      for(var i=0;i<newEmojicolors.length;i++) {
        var newEmojicolor = newEmojicolors[i];
        var n = emojicolors.length + 1 + i;

        var emojicolor = new Emojicolors({
          title: newEmojicolor.title,
          color: -1,
          index: n,
          group: selectEmojicolorGroup
        });
        emojicolor.$save(importSuccessCallback, importErrorCallback);
      }
    };
  }
]);

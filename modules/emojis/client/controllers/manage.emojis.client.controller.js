'use strict';

/*jslint eqeq: true*/

// Manage Emoji controller
angular.module('emojis').controller('ManageEmojisController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emojis', 'EmojiGroups',
  function ($scope, $stateParams, $location, Authentication, Emojis, EmojiGroups) {
    $scope.authentication = Authentication;

    $scope.emojiGroups = EmojiGroups.query();
    //$scope.emojis = Emojis.query();

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
      exporterPdfHeader: { text: "Emoji Group", style: 'headerStyle' },
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
        { field: 'type',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownOptionsArray: [
            { type: 'systemlastest' },
            { type: 'system' }
          ],
          editDropdownIdLabel: 'type',
          editDropdownValueLabel: 'type' },
        { field: 'file' },
        { field: 'icon' },
        { field: 'seperate',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          cellFilter: 'mapSeperate',
          editDropdownOptionsArray: [
            { id: ' ', seperate: 'white space' },
            { id: '\n', seperate: 'enter' }
          ],
          editDropdownIdLabel: 'id',
          editDropdownValueLabel: 'seperate' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'emojiGroups' };
    $scope.groupGridOptions.onRegisterApi = function (gridApi) {
      gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
        var emojiGroup = rowEntity;
        emojiGroup.$update();

        $scope.$apply();
      });
      gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
        var emojiGroups=$scope.emojiGroups;
        for(var i=0;i<emojiGroups.length;i++)
        {
          var emojiGroup=emojiGroups[i];
          emojiGroup.index=i;
          emojiGroup.$update();
        }
      });
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.selectEmojiGroup = row.entity;

        $scope.emojis = Emojis.getFromGroup({
          emojiGroupId: row.entity._id
        });

        //// reset group dropdown data, to fix the bug
        $scope.emojiGridOptions.columnDefs[2].editDropdownOptionsArray = $scope.emojiGroups;
      });
    };

    // Config emoji grid
    $scope.emojiGridOptions = {
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
      exporterPdfHeader: { text: "Emoji", style: 'headerStyle' },
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
        { name: 'Group',
          field: 'group._id',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          cellFilter: 'mapGroup:row.entity',
          editDropdownOptionsArray: $scope.emojiGroups,
          editDropdownIdLabel: '_id',
          editDropdownValueLabel: 'name' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'emojis' };
    $scope.emojiGridOptions.onRegisterApi = function (gridApi) {
      gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
        var emoji = rowEntity;
        if (colDef.name=='Group')
        {
          var groupId = newValue;
          var emojiGroups=$scope.emojiGroups;

          // find group with id
          var group = null;
          for(var i=0;i<emojiGroups.length;i++) {
            var emojiGroup = emojiGroups[i];
            if (emojiGroup._id == groupId) {
              group = emojiGroup;
              break;
            }
          }

          emoji.group=group;
        }
        emoji.$update();

        $scope.$apply();
      });
      gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
        var emojis=$scope.emojis;
        for(var i=0;i<emojis.length;i++)
        {
          var emoji=$scope.emojis[i];
          emoji.index=i;
          emoji.$update();
        }
      });
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.selectEmoji = row.entity;
      });
    };

    $scope.addGroup = function() {
      var emojiGroups=$scope.emojiGroups;
      var n = emojiGroups.length + 1;

      // add
      var emojiGroup = new EmojiGroups({
        name: "Group " + n,
        type: "system",
        file: "系统" + n,
        icon: "icon.png",
        seperate: " ",
        index: n
      });
      emojiGroup.$save(function (response) {
        // show
        var emojiGroup=response;
        emojiGroups.push(emojiGroup);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.removeGroup = function() {
      var emojiGroups=$scope.emojiGroups;

      // remove
      var selectEmojiGroup=$scope.selectEmojiGroup;
      selectEmojiGroup.$remove();

      // show
      for(var i=0;i<emojiGroups.length;i++) {
        var emojiGroup = emojiGroups[i];
        if (emojiGroup == selectEmojiGroup) {
          emojiGroups.splice(i, 1);
        }
      }

      selectEmojiGroup=null;
    };

    $scope.addEmoji = function() {
      var emojis=$scope.emojis;
      var selectEmojiGroup=$scope.selectEmojiGroup;
      var n = emojis.length + 1;

      // add
      var emoji = new Emojis({
        title: "Emoji " + n,
        index: n,
        group: selectEmojiGroup
      });
      emoji.$save(function (response) {
        // show
        var emoji=response;
        emojis.push(emoji);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.removeEmoji = function() {
      var emojis=$scope.emojis;

      // remove
      var selectEmoji=$scope.selectEmoji;
      selectEmoji.$remove();

      // show
      for(var i=0;i<emojis.length;i++) {
        var emoji = emojis[i];
        if (emoji == selectEmoji) {
          emojis.splice(i, 1);
        }
      }

      selectEmoji=null;
    };
  }
])
    .filter('mapGroup', function() {
      return function(input, emoji) {
        if (!input){
          return '';
        } else {
          return emoji.group.name;
        }
      };
    })
    .filter('mapSeperate', function() {
      var seperateHash = {
        ' ' : 'white space',
        '\n' : 'enter'
      };

      return function(input) {
        if (!input){
          return '';
        } else {
          return seperateHash[input];
        }
      };
    });

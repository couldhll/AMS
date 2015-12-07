'use strict';

// Manage Emoticon controller
angular.module('emojis').controller('ManageEmoticonsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emoticons', 'EmoticonGroups', 'FileUploader', '$window', '$timeout',
      function ($scope, $stateParams, $location, Authentication, Emoticons, EmoticonGroups, FileUploader, $window, $timeout) {
        $scope.authentication = Authentication;

        $scope.emoticonGroups = EmoticonGroups.query();

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
          exporterPdfHeader: { text: "Emoticon Group", style: 'headerStyle' },
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
                { type: 'facelastest' },
                { type: 'facecollect' },
                { type: 'face' }
              ],
              editDropdownIdLabel: 'type',
              editDropdownValueLabel: 'type' },
            { field: 'file' },
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
            { name: 'Created Time', field: 'created', enableCellEdit:false }],
          data: 'emoticonGroups' };
        $scope.groupGridOptions.onRegisterApi = function (gridApi) {
          $scope.groupGridApi = gridApi;
          gridApi.edit.on.beginCellEdit($scope,function(rowEntity, colDef, triggerEvent) {
            var emoticonGroup = rowEntity;
          });

          gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            var emoticonGroup = rowEntity;

            emoticonGroup.$update();
            $scope.$apply();
          });
          gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
            var emoticonGroups=$scope.emoticonGroups;
            for(var i=0;i<emoticonGroups.length;i++)
            {
              var emoticonGroup=emoticonGroups[i];
              emoticonGroup.index=i;
              emoticonGroup.$update();
            }
          });
          gridApi.selection.on.rowSelectionChanged($scope,function(row){
            $scope.selectEmoticonGroup = row.entity;

            $scope.emoticons = Emoticons.getFromGroup({
              emoticonGroupId: row.entity._id
            });

            //// reset group dropdown data, to fix the bug
            $scope.emoticonGridOptions.columnDefs[2].editDropdownOptionsArray = $scope.emoticonGroups;
          });
        };

        // Config emoticon grid
        $scope.emoticonGridOptions = {
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
          exporterPdfHeader: { text: "Emoticon", style: 'headerStyle' },
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
              cellFilter: 'mapGroup:row.entity.group.name',
              editDropdownOptionsArray: $scope.emoticonGroups,
              editDropdownIdLabel: '_id',
              editDropdownValueLabel: 'name' },
            { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
            { name: 'Created Time', field: 'created', enableCellEdit:false }
          ],
          data: 'emoticons' };
        $scope.emoticonGridOptions.importerDataAddCallback = function(grid, newObjects) {
          var emoticons=$scope.emoticons;
          var selectEmoticonGroup=$scope.selectEmoticonGroup;
          var newEmoticons=newObjects;

          var importSuccessCallback = function (response) {
            // show
            var emoticon = response;
            emoticons.push(emoticon);
          };
          var importErrorCallback = function (errorResponse) {
            $scope.error = errorResponse.data.message;
          };

          // add
          for(var i=0;i<newEmoticons.length;i++) {
            var newEmoticon = newEmoticons[i];
            var n = emoticons.length + 1 + i;

            var emoticon = new Emoticons({
              title: newEmoticon.title,
              index: n,
              group: selectEmoticonGroup
            });
            emoticon.$save(importSuccessCallback, importErrorCallback);
          }
        };
        $scope.emoticonGridOptions.onRegisterApi = function (gridApi) {
          $scope.emoticonGridApi = gridApi;
          gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            var emoticon = rowEntity;
            if (colDef.name=='Group')
            {
              var groupId = newValue;
              var emoticonGroups=$scope.emoticonGroups;

              // find group with id
              var group = null;
              for(var i=0;i<emoticonGroups.length;i++) {
                var emoticonGroup = emoticonGroups[i];
                if (emoticonGroup._id == groupId) {
                  group = emoticonGroup;
                  break;
                }
              }

              emoticon.group=group;
            }
            emoticon.$update();

            $scope.$apply();
          });
          gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
            var emoticons=$scope.emoticons;
            for(var i=0;i<emoticons.length;i++)
            {
              var emoticon=$scope.emoticons[i];
              emoticon.index=i;
              emoticon.$update();
            }
          });
          gridApi.selection.on.rowSelectionChanged($scope,function(row){
            $scope.selectEmoticon = row.entity;
          });
        };

        $scope.addGroup = function() {
          var emoticonGroups=$scope.emoticonGroups;
          var n = emoticonGroups.length + 1;

          // add
          var emoticonGroup = new EmoticonGroups({
            name: "Group " + n,
            type: "face",
            file: "系统" + n,
            icon: "icon.png",
            seperate: "\n",
            index: n
          });
          emoticonGroup.$save(function (response) {
            // show
            var emoticonGroup=response;
            emoticonGroups.push(emoticonGroup);
          }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
        };

        $scope.removeGroup = function() {
          var emoticonGroups=$scope.emoticonGroups;

          // remove
          var selectEmoticonGroup=$scope.selectEmoticonGroup;
          selectEmoticonGroup.$remove();

          // show
          for(var i=0;i<emoticonGroups.length;i++) {
            var emoticonGroup = emoticonGroups[i];
            if (emoticonGroup == selectEmoticonGroup) {
              emoticonGroups.splice(i, 1);
            }
          }

          selectEmoticonGroup=null;
        };

        $scope.addEmoticon = function() {
          var emoticons=$scope.emoticons;
          var selectEmoticonGroup=$scope.selectEmoticonGroup;
          var n = emoticons.length + 1;

          // add
          var emoticon = new Emoticons({
            title: "Emoticon " + n,
            index: n,
            group: selectEmoticonGroup
          });
          emoticon.$save(function (response) {
            // show
            var emoticon = response;
            emoticons.push(emoticon);
          }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
        };

        $scope.removeEmoticon = function() {
          var emoticons=$scope.emoticons;

          // remove
          var selectEmoticon=$scope.selectEmoticon;
          selectEmoticon.$remove();

          // show
          for(var i=0;i<emoticons.length;i++) {
            var emoticon = emoticons[i];
            if (emoticon == selectEmoticon) {
              emoticons.splice(i, 1);
            }
          }

          selectEmoticon=null;
        };
      }
    ])
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

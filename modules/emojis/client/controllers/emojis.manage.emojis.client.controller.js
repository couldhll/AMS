'use strict';

// Manage Emoji controller
angular.module('emojis').controller('ManageEmojisController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emojis', 'EmojiGroups', 'FileUploader', '$window', '$timeout',
      function ($scope, $stateParams, $location, Authentication, Emojis, EmojiGroups, ImageUploader, $window, $timeout) {
        $scope.authentication = Authentication;

        $scope.emojiGroups = EmojiGroups.query();

        // Uploader
        $scope.uploader = ImageUploader.uploader;
        $scope.uploadPicture = function () {
          ImageUploader.uploadPicture();
        };
        $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
          // Update image url
          var emojiGroup = response;
          $scope.uploaderEmojiGroup.icon2xURL = emojiGroup.icon2xURL;
          $scope.uploaderEmojiGroup.icon3xURL = emojiGroup.icon3xURL;
          $scope.$emit('EventUpload');
        };

        // Init Group
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
            { field: 'icon2xURL',
              cellTemplate: '<div class="ui-grid-cell-contents"><img width="40" height="40" src="{{ COL_FIELD }}" /></div>',
              editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();">Upload</button></div>' },
            { field: 'icon3xURL',
              cellTemplate: '<div class="ui-grid-cell-contents"><img width="60" height="60" src="{{ COL_FIELD }}" set-row-height /></div>',
              editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();">Upload</button></div>' },
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
          data: 'data' };
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
        $scope.removeGroup = function(removeEntity) {
          var group = removeEntity;
        };
        $scope.beginEditGroup = function(rowEntity, colDef, triggerEvent) {
          var emojiGroup = rowEntity;

          if (colDef.field=='icon2xURL') {
            $scope.uploader.url = '/api/emojiGroups/' + emojiGroup._id + '/icon2x';
          }
          else if(colDef.field=='icon3xURL') {
            $scope.uploader.url = '/api/emojiGroups/' + emojiGroup._id + '/icon3x';
          }

          $scope.uploaderEmojiGroup = emojiGroup;
        };
        $scope.afterEditGroup = function(rowEntity, colDef, newValue, oldValue) {
          var emojiGroup = rowEntity;

          if (colDef.field!='icon2xURL'&&colDef.field!='icon3xURL') {
            emojiGroup.$update();
            $scope.$apply();
          }
        };
        $scope.rowSelectionChangedGroup = function(row) {
          $scope.selectEmojiGroup = row.entity;

          $scope.emojis = Emojis.getFromGroup({
            emojiGroupId: row.entity._id
          });

          // reset group dropdown data, to fix the bug
          $scope.emojiGridOptions.columnDefs[2].editDropdownOptionsArray = $scope.emojiGroups;
        };

        // Init emoji
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
              cellFilter: 'mapGroup:row.entity.group.name',
              editDropdownOptionsArray: $scope.emojiGroups,
              editDropdownIdLabel: '_id',
              editDropdownValueLabel: 'name' },
            { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
            { name: 'Created Time', field: 'created', enableCellEdit:false }
          ],
          data: 'data' };
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
            var emoji = response;
            emojis.push(emoji);
          }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
        };
        $scope.removeEmoji = function(removeEntity) {
          var emoji = removeEntity;
        };
        $scope.afterEditEmoji = function(rowEntity, colDef, newValue, oldValue) {
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
        };
        $scope.importEmoji = function(grid, newObjects) {
          var emojis=$scope.emojis;
          var selectEmojiGroup=$scope.selectEmojiGroup;
          var newEmojis=newObjects;

          var importSuccessCallback = function (response) {
            // show
            var emoji = response;
            emojis.push(emoji);
          };
          var importErrorCallback = function (errorResponse) {
            $scope.error = errorResponse.data.message;
          };

          // add
          for(var i=0;i<newEmojis.length;i++) {
            var newEmoji = newEmojis[i];
            var n = emojis.length + 1 + i;

            var emoji = new Emojis({
              title: newEmoji.title,
              index: n,
              group: selectEmojiGroup
            });
            emoji.$save(importSuccessCallback, importErrorCallback);
          }
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

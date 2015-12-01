'use strict';

// Manage Emoji controller
angular.module('emojis').controller('ManageEmojisController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emojis', 'EmojiGroups', 'FileUploader', '$window', '$timeout',
      function ($scope, $stateParams, $location, Authentication, Emojis, EmojiGroups, FileUploader, $window, $timeout) {
        $scope.authentication = Authentication;

        $scope.emojiGroups = EmojiGroups.query();

        // Create file uploader instance
        $scope.uploader = new FileUploader();
        // Set file uploader image filter
        $scope.uploader.filters.push({
          name: 'imageFilter',
          fn: function (item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            var result ='|png|'.indexOf(type) !== -1;
            if (!result) {
              alert('Please choose png image');
            }
            return result; // Only png
          }
        });
        // Called after the user selected a new picture file
        $scope.uploader.onAfterAddingFile = function (fileItem) {
          if ($window.FileReader) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(fileItem._file);

            fileReader.onload = function (fileReaderEvent) {
              $timeout(function () {
                //$scope.imageURL = fileReaderEvent.target.result;
              }, 0);
            };
          }
        };
        // Called after the user has successfully uploaded a new picture
        $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
          //// Show success message
          //$scope.success = true

          // Update image url
          var emojiGroup = response;
          $scope.uploaderEmojiGroup.icon2xURL = emojiGroup.icon2xURL;
          $scope.uploaderEmojiGroup.icon3xURL = emojiGroup.icon3xURL;

          // Clear upload buttons
          $scope.cancelUpload();
        };
        // Called after the user has failed to uploaded a new picture
        $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
          // Clear upload buttons
          $scope.cancelUpload();

          //// Show error message
          //$scope.error = response.message;
        };
        // Change picture
        $scope.uploadPicture = function () {
          //// Clear messages
          //$scope.success = $scope.error = null;

          // Start upload
          $scope.uploader.uploadAll();
        };
        // Cancel the upload process
        $scope.cancelUpload = function () {
          $scope.uploader.clearQueue();
        };

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
            { field: 'icon2xURL',
              cellTemplate: '<div class="ui-grid-cell-contents"><img width="40" height="40" src="{{ COL_FIELD }}" /></div>',
              editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadPicture();$emit(\'EventUpload\');">Upload</button></div>' },
            { field: 'icon3xURL',
              cellTemplate: '<div class="ui-grid-cell-contents"><img width="60" height="60" src="{{ COL_FIELD }}" set-row-height /></div>',
              editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadPicture();$emit(\'EventUpload\');">Upload</button></div>' },
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
          data: 'emojiGroups' };
        $scope.groupGridOptions.onRegisterApi = function (gridApi) {
          $scope.groupGridApi = gridApi;
          gridApi.edit.on.beginCellEdit($scope,function(rowEntity, colDef, triggerEvent) {
            var emojiGroup = rowEntity;

            if (colDef.field=='icon2xURL') {
              $scope.uploader.url = '/api/emojiGroups/' + emojiGroup._id + '/icon2x';
            }
            else if(colDef.field=='icon3xURL') {
              $scope.uploader.url = '/api/emojiGroups/' + emojiGroup._id + '/icon3x';
            }

            $scope.uploaderEmojiGroup = emojiGroup;
          });

          gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            var emojiGroup = rowEntity;

            if (colDef.field!='icon2xURL'&&colDef.field!='icon3xURL') {
              emojiGroup.$update();
              $scope.$apply();
            }
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
              cellFilter: 'mapGroup:row.entity.group.name',
              editDropdownOptionsArray: $scope.emojiGroups,
              editDropdownIdLabel: '_id',
              editDropdownValueLabel: 'name' },
            { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
            { name: 'Created Time', field: 'created', enableCellEdit:false }
          ],
          data: 'emojis' };
        $scope.emojiGridOptions.importerDataAddCallback = function(grid, newObjects) {
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
        $scope.emojiGridOptions.onRegisterApi = function (gridApi) {
          $scope.emojiGridApi = gridApi;
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
            var emoji = response;
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
      return function(input, show) {
        if (!input){
          return '';
        } else {
          return show;
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
    })
    .directive('setRowHeight',['$timeout', function ($timeout) {
      return {
        restrict: 'A',
        link: function (scope, element) {
          $timeout(function(){
            // Get the Parent Divider.
            var parentContainer = element.parent()[0];
            //console.log(parentContainer.offsetHeight);

            // Padding of ui-grid-cell-contents is 5px.
            // TODO: Better way to get padding height?
            var topBottomPadding = 10;
            //Get the wrapped contents rowHeight.
            var rowHeight = topBottomPadding + parentContainer.offsetHeight;
            var gridRowHeight = scope.grid.options.rowHeight;
            // Get current rowHeight
            if (!gridRowHeight ||
                (gridRowHeight && gridRowHeight < rowHeight)) {
              // This will OVERRIDE the existing rowHeight.
              scope.grid.options.rowHeight = rowHeight;
            }
          },0);
        }
      };
    }])

    // for close edit
    .directive('uiGridEditUpload',
    ['uiGridConstants', 'uiGridEditConstants',
      function (uiGridConstants, uiGridEditConstants) {
        return {
          require: ['?^uiGrid', '?^uiGridRenderContainer'],
          scope: true,
          compile: function () {
            return {
              pre: function ($scope, $elm, $attrs) {

              },
              post: function ($scope, $elm, $attrs, controllers) {
                var uiGridCtrl = controllers[0];
                var renderContainerCtrl = controllers[1];

                //set focus at start of edit
                $scope.$on(uiGridEditConstants.events.BEGIN_CELL_EDIT, function () {
                  $elm[0].focus();
                  $elm[0].style.width = ($elm[0].parentElement.offsetWidth - 1) + 'px';
                  $elm.on('focusout', function (evt) {
                    evt.preventDefault();

                    var container = window.$(evt.currentTarget);

                    setTimeout(window.$.proxy(function()
                    {
                      var target = document.activeElement;
                      if (target !== null) {
                        if (container[0] !== target) {
                          if (container.has(target).length === 0) {
                            $scope.stopEdit(evt);
                          }
                        }
                      }
                    }, this), 1);
                  });
                });

                $scope.$on('EventUpload', function (evt) {
                  $scope.stopEdit(evt);
                });

                $scope.stopEdit = function (evt) {
                  $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                };
              }
            };
          }
        };
      }]);

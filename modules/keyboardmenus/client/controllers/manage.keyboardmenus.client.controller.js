'use strict';

// Manage Keyboardmenu controller
angular.module('keyboardmenus').controller('ManageKeyboardmenusController', ['$scope', '$stateParams', '$location', 'Authentication', 'Keyboardmenus', 'ImageUploader', '$window', '$timeout',
  function ($scope, $stateParams, $location, Authentication, Keyboardmenus, ImageUploader, $window, $timeout) {
    $scope.authentication = Authentication;

    $scope.keyboardmenus = Keyboardmenus.query();

    // Uploader
    $scope.uploader = ImageUploader.uploader;
    $scope.uploadPicture = function () {
      ImageUploader.uploadPicture();
    };
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Update image url
      var keyboardmenu = response;
      $scope.uploaderKeyboardmenu.iconiPad1xURL = keyboardmenu.iconiPad1xURL;
      $scope.uploaderKeyboardmenu.iconiPad2xURL = keyboardmenu.iconiPad2xURL;
      $scope.uploaderKeyboardmenu.iconiPhone2xURL = keyboardmenu.iconiPhone2xURL;
      $scope.uploaderKeyboardmenu.iconiPhone3xURL = keyboardmenu.iconiPhone3xURL;
      $scope.uploaderKeyboardmenu.selectIconiPad1xURL = keyboardmenu.selectIconiPad1xURL;
      $scope.uploaderKeyboardmenu.selectIconiPad2xURL = keyboardmenu.selectIconiPad2xURL;
      $scope.uploaderKeyboardmenu.selectIconiPhone2xURL = keyboardmenu.selectIconiPhone2xURL;
      $scope.uploaderKeyboardmenu.selectIconiPhone3xURL = keyboardmenu.selectIconiPhone3xURL;
      $scope.uploaderKeyboardmenu.highlightIconiPad1xURL = keyboardmenu.highlightIconiPad1xURL;
      $scope.uploaderKeyboardmenu.highlightIconiPad2xURL = keyboardmenu.highlightIconiPad2xURL;
      $scope.uploaderKeyboardmenu.highlightIconiPhone2xURL = keyboardmenu.highlightIconiPhone2xURL;
      $scope.uploaderKeyboardmenu.highlightIconiPhone3xURL = keyboardmenu.highlightIconiPhone3xURL;
      $scope.uploaderKeyboardmenu.iconThemeiPad1xURL = keyboardmenu.iconThemeiPad1xURL;
      $scope.uploaderKeyboardmenu.iconThemeiPad2xURL = keyboardmenu.iconThemeiPad2xURL;
      $scope.uploaderKeyboardmenu.iconThemeiPhone2xURL = keyboardmenu.iconThemeiPhone2xURL;
      $scope.uploaderKeyboardmenu.iconThemeiPhone3xURL = keyboardmenu.iconThemeiPhone3xURL;
      $scope.uploaderKeyboardmenu.selectIconThemeiPad1xURL = keyboardmenu.selectIconThemeiPad1xURL;
      $scope.uploaderKeyboardmenu.selectIconThemeiPad2xURL = keyboardmenu.selectIconThemeiPad2xURL;
      $scope.uploaderKeyboardmenu.selectIconThemeiPhone2xURL = keyboardmenu.selectIconThemeiPhone2xURL;
      $scope.uploaderKeyboardmenu.selectIconThemeiPhone3xURL = keyboardmenu.selectIconThemeiPhone3xURL;
      $scope.uploaderKeyboardmenu.highlightIconThemeiPad1xURL = keyboardmenu.highlightIconThemeiPad1xURL;
      $scope.uploaderKeyboardmenu.highlightIconThemeiPad2xURL = keyboardmenu.highlightIconThemeiPad2xURL;
      $scope.uploaderKeyboardmenu.highlightIconThemeiPhone2xURL = keyboardmenu.highlightIconThemeiPhone2xURL;
      $scope.uploaderKeyboardmenu.highlightIconThemeiPhone3xURL = keyboardmenu.highlightIconThemeiPhone3xURL;
    };

    // Init keyboardmenu
    $scope.keyboardmenuGridOptions = {
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
      exporterPdfHeader: { text: "Keyboardmenu", style: 'headerStyle' },
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
        { field: '_id', minWidth: '100', enableCellEdit:false },
        { field: 'type', minWidth: '100',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownOptionsArray: [
            { type: 'classic' },
            { type: 'nijigen' }
          ],
          editDropdownIdLabel: 'type',
          editDropdownValueLabel: 'type' },
        { field: 'position', minWidth: '100',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownOptionsArray: [
            { position: 'menu' },
            { position: 'toolbar' }
          ],
          editDropdownIdLabel: 'position',
          editDropdownValueLabel: 'position' },
        { field: 'name' , minWidth: '100' },
        { field: 'title' , minWidth: '100' },
        { field: 'selectTitle' , minWidth: '100' },
        { field: 'iconFile' , minWidth: '100' },
        { field: 'iconiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" set-row-height /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconFile', minWidth: '100' },
        { field: 'selectIconiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconFile', minWidth: '100' },
        { field: 'highlightIconiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconThemeFile', minWidth: '100' },
        { field: 'iconThemeiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconThemeiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconThemeiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'iconThemeiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconThemeFile', minWidth: '100' },
        { field: 'selectIconThemeiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconThemeiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconThemeiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'selectIconThemeiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconThemeFile', minWidth: '100' },
        { field: 'highlightIconThemeiPad1xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="48" height="48" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconThemeiPad2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="96" height="96" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconThemeiPhone2xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="53" height="53" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { field: 'highlightIconThemeiPhone3xURL', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><img width="80" height="80" src="{{ COL_FIELD }}" /></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { name: 'Created User', minWidth: '100', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', minWidth: '100', field: 'created', enableCellEdit:false }
      ],
      data: 'data' };
    $scope.addKeyboardmenu = function() {
      var keyboardmenus=$scope.keyboardmenus;
      var selectKeyboardmenuGroup=$scope.selectKeyboardmenuGroup;
      var n = keyboardmenus.length + 1;

      // add
      var keyboardmenu = new Keyboardmenus({
        type: "classic",
        position: "menu",
        name: n,
        title: "Menu " + n,
        index: n,
        group: selectKeyboardmenuGroup
      });
      keyboardmenu.$save(function (response) {
        // show
        var keyboardmenu = response;
        keyboardmenus.push(keyboardmenu);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.removeKeyboardmenu = function(removeEntity) {
      var keyboardmenu = removeEntity;
    };
    $scope.beginEditKeyboardmenu = function(rowEntity, colDef, triggerEvent) {
      var keyboardmenu = rowEntity;

      if (colDef.field=='iconiPad1xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/iconiPad1x';
      }
      else if(colDef.field=='iconiPad2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/iconiPad2x';
      }
      else if(colDef.field=='iconiPhone2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/iconiPhone2x';
      }
      else if(colDef.field=='iconiPhone3xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/iconiPhone3x';
      }
      else if (colDef.field=='selectIconiPad1xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/selectIconiPad1x';
      }
      else if(colDef.field=='selectIconiPad2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/selectIconiPad2x';
      }
      else if(colDef.field=='selectIconiPhone2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/selectIconiPhone2x';
      }
      else if(colDef.field=='selectIconiPhone3xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/selectIconiPhone3x';
      }
      else if (colDef.field=='highlightIconiPad1xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/highlightIconiPad1x';
      }
      else if(colDef.field=='highlightIconiPad2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/highlightIconiPad2x';
      }
      else if(colDef.field=='highlightIconiPhone2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/highlightIconiPhone2x';
      }
      else if(colDef.field=='highlightIconiPhone3xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/highlightIconiPhone3x';
      }
      else if (colDef.field=='iconThemeiPad1xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/iconThemeiPad1x';
      }
      else if(colDef.field=='iconThemeiPad2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/iconThemeiPad2x';
      }
      else if(colDef.field=='iconThemeiPhone2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/iconThemeiPhone2x';
      }
      else if(colDef.field=='iconThemeiPhone3xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/iconThemeiPhone3x';
      }
      else if (colDef.field=='selectIconThemeiPad1xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/selectIconThemeiPad1x';
      }
      else if(colDef.field=='selectIconThemeiPad2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/selectIconThemeiPad2x';
      }
      else if(colDef.field=='selectIconThemeiPhone2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/selectIconThemeiPhone2x';
      }
      else if(colDef.field=='selectIconThemeiPhone3xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/selectIconThemeiPhone3x';
      }
      else if (colDef.field=='highlightIconThemeiPad1xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/highlightIconThemeiPad1x';
      }
      else if(colDef.field=='highlightIconThemeiPad2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/highlightIconThemeiPad2x';
      }
      else if(colDef.field=='highlightIconThemeiPhone2xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/highlightIconThemeiPhone2x';
      }
      else if(colDef.field=='highlightIconThemeiPhone3xURL') {
        $scope.uploader.url = '/api/keyboardmenus/' + keyboardmenu._id + '/highlightIconThemeiPhone3x';
      }

      $scope.uploaderKeyboardmenu = keyboardmenu;
    };
    $scope.afterEditKeyboardmenu = function(rowEntity, colDef, newValue, oldValue) {
      var keyboardmenu = rowEntity;
      if (colDef.name=='Group')
      {
        var groupId = newValue;
        var keyboardmenuGroups=$scope.keyboardmenuGroups;

        // find group with id
        var group = null;
        for(var i=0;i<keyboardmenuGroups.length;i++) {
          var keyboardmenuGroup = keyboardmenuGroups[i];
          if (keyboardmenuGroup._id == groupId) {
            group = keyboardmenuGroup;
            break;
          }
        }

        keyboardmenu.group=group;
      }
    };
    $scope.importKeyboardmenu = function(grid, newObjects) {
      var keyboardmenus=$scope.keyboardmenus;
      var selectKeyboardmenuGroup=$scope.selectKeyboardmenuGroup;
      var newKeyboardmenus=newObjects;

      var importSuccessCallback = function (response) {
        // show
        var keyboardmenu = response;
        keyboardmenus.push(keyboardmenu);
      };
      var importErrorCallback = function (errorResponse) {
        $scope.error = errorResponse.data.message;
      };

      // add
      for(var i=0;i<newKeyboardmenus.length;i++) {
        var newKeyboardmenu = newKeyboardmenus[i];
        var n = keyboardmenus.length + 1 + i;

        var keyboardmenu = new Keyboardmenus({
          type: newKeyboardmenu.type,
          position: newKeyboardmenu.position,
          name: newKeyboardmenu.name,
          title: newKeyboardmenu.title,
          index: n,
          group: selectKeyboardmenuGroup
        });
        keyboardmenu.$save(importSuccessCallback, importErrorCallback);
      }
    };
  }
]);

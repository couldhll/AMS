'use strict';

// Manage Patch controller
angular.module('patchs').controller('ManagePatchsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Patchs', 'ScriptUploader', '$window', '$timeout',
  function ($scope, $stateParams, $location, Authentication, Patchs, ScriptUploader, $window, $timeout) {
    $scope.authentication = Authentication;

    $scope.patchs = Patchs.query();

    // Uploader
    $scope.uploader = ScriptUploader.uploader;
    $scope.uploadPicture = function () {
      ScriptUploader.uploadPicture();
    };
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Update image url
      var patch = response;
      $scope.uploaderPatch.scriptFile = patch.scriptFile;
    };

    // Init patch
    $scope.patchGridOptions = {
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
      exporterPdfHeader: { text: "Patch", style: 'headerStyle' },
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
        { field: 'mode',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownOptionsArray: [
            { mode: 'Now' },
            { mode: 'Foreground'},
            { mode: 'Launch'}
          ],
          editDropdownIdLabel: 'mode',
          editDropdownValueLabel: 'mode' },
        { field: 'script',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownOptionsArray: [
            { script: 'Lua' }
          ],
          editDropdownIdLabel: 'script',
          editDropdownValueLabel: 'script' },
        { field: 'host',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownOptionsArray: [
            { host: 'Container' },
            { host: 'Keyboard'}
          ],
          editDropdownIdLabel: 'host',
          editDropdownValueLabel: 'host' },
        { field: 'encrypt',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownOptionsArray: [
            { encrypt: true },
            { encrypt: false }
          ],
          editDropdownIdLabel: 'encrypt',
          editDropdownValueLabel: 'encrypt' },
        { field: 'scriptFile', minWidth: '150',
          cellTemplate: '<div class="ui-grid-cell-contents"><a href="{{ COL_FIELD }}" target="_blank">{{ COL_FIELD }}</a></div>',
          editableCellTemplate: '<div contentEditable ui-grid-edit-upload><span class="btn btn-default btn-file">Browse <input type="file" nv-file-select uploader="grid.appScope.uploader"></span><button type="button" class="btn btn-success" ng-click="grid.appScope.uploadClick();$emit(\'EventUpload\');">Upload</button></div>' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'data' };
    $scope.addPatch = function() {
      var patchs=$scope.patchs;
      var selectPatchGroup=$scope.selectPatchGroup;
      var n = patchs.length + 1;

      // add
      var patch = new Patchs({
        name: 'patch_' + n + '.lua',
        mode: 'Now',
        script: 'Lua',
        host: 'Container',
        encrypt: true ,
        index: n,
        group: selectPatchGroup
      });
      patch.$save(function (response) {
        // show
        var patch = response;
        patchs.push(patch);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.removePatch = function(removeEntity) {
      var patch = removeEntity;
    };
    $scope.beginEditPatch = function(rowEntity, colDef, triggerEvent) {
      var patch = rowEntity;

      if (colDef.field=='scriptFile') {
        $scope.uploader.url = '/api/patchs/' + patch._id + '/scriptFile';
      }

      $scope.uploaderPatch = patch;
    };
    $scope.afterEditPatch = function(rowEntity, colDef, newValue, oldValue) {
      var patch = rowEntity;
      if (colDef.name=='Group')
      {
        var groupId = newValue;
        var patchGroups=$scope.patchGroups;

        // find group with id
        var group = null;
        for(var i=0;i<patchGroups.length;i++) {
          var patchGroup = patchGroups[i];
          if (patchGroup._id == groupId) {
            group = patchGroup;
            break;
          }
        }

        patch.group=group;
      }
    };
    $scope.importPatch = function(grid, newObjects) {
      var patchs=$scope.patchs;
      var selectPatchGroup=$scope.selectPatchGroup;
      var newPatchs=newObjects;

      var importSuccessCallback = function (response) {
        // show
        var patch = response;
        patchs.push(patch);
      };
      var importErrorCallback = function (errorResponse) {
        $scope.error = errorResponse.data.message;
      };

      // add
      for(var i=0;i<newPatchs.length;i++) {
        var newPatch = newPatchs[i];
        var n = patchs.length + 1 + i;

        var patch = new Patchs({
          name: newPatch.name,
          mode: newPatch.mode,
          script: newPatch.script,
          host: newPatch.host,
          encrypt: newPatch.encrypt,
          index: n,
          group: selectPatchGroup
        });
        patch.$save(importSuccessCallback, importErrorCallback);
      }
    };
  }
]);

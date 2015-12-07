'use strict';

angular.module('emojis')
    .directive('uiGridOne',[function () {
      return {
        restrict: 'E',
        scope: {
          title: '@',
          name: '=',
          data: '=',
          gridOptions: '=',
          addClick: '&',
          removeClick: '&',
          editClick: '&',
          importClick: '&'
        },
        templateUrl: 'modules/core/client/views/ui-grid-one.client.view.html',
        link: function (scope, element) {
          scope.gridOptions.importerDataAddCallback = function(grid, newObjects) {
            scope.importClick({grid: grid, newObjects: newObjects});
          };
          scope.gridOptions.onRegisterApi = function (gridApi) {
            scope.gridApi = gridApi;
            gridApi.edit.on.afterCellEdit(scope,function(rowEntity, colDef, newValue, oldValue){
              scope.editClick({rowEntity: rowEntity, colDef: colDef, newValue: newValue, oldValue: oldValue});

              rowEntity.$update();
              scope.$apply();
            });
            gridApi.draggableRows.on.rowDropped(scope, function (info, dropTarget) {
              for(var i=0;i<scope.data.length;i++)
              {
                var one=scope.data[i];
                one.index=i;
                one.$update();
              }
            });
            gridApi.selection.on.rowSelectionChanged(scope,function(row){
              scope.selectOne = row.entity;
            });
          };

          scope.addOne = function() {
            scope.addClick();
          };
          scope.removeOne = function() {
            scope.removeClick({removeEntity: scope.selectOne});

            // show
            for (var i = 0; i < scope.data.length; i++) {
              var one = scope.data[i];
              if (one == scope.selectOne) {
                scope.data.splice(i, 1);
              }
            }

            // remove
            scope.selectOne.$remove();
            scope.selectOne=null;
          };
        }
      };
    }]);

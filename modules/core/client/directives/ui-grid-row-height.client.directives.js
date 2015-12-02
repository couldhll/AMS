'use strict';

angular.module('core')
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
    }]);

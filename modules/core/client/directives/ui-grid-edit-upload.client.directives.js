'use strict';

angular.module('core')
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

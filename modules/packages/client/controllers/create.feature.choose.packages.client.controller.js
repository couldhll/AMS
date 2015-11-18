'use strict';

// Create Feature Packages controller
angular.module('packages').controller('CreateFeaturePackagesController', ['$scope', '$stateParams', '$location', 'Authentication', '$state',
  function ($scope, $stateParams, $location, Authentication, $state) {
    $scope.authentication = Authentication;

    // Init feature
    if ($scope.packages.feature == null) {
      $scope.packages.feature = {};
      $scope.packages.feature.pages = [
        {name: 'emoji', url: '^.emojis'},
        //{name: 'toolbar', url: '^.toolbar'},
        //{name: 'menubar', url: '^.menubar'},
        //{name: 'commingsoon', url: '^.commingsoon'}
      ];

      // Goto event
      $scope.packages.feature.GotoNextPage = function() {
        // Next feature
        if ($scope.packages.feature.nowPage == null) {
          $scope.packages.feature.nowPage = $scope.packages.feature.selectPages[0];
        }
        else {
          for (var i = 0; i < $scope.packages.feature.selectPages.length; i++) {
            var selectPage = $scope.packages.feature.selectPages[i];
            if (selectPage == $scope.packages.feature.nowPage) {
              $scope.packages.feature.nowPage = $scope.packages.feature.selectPages[i + 1];
              break;
            }
          }
        }

        var url = null;
        if ($scope.packages.feature.nowPage == null) {
          // Next part
          $scope.packages.GotoNextPage();
        }
        else {
          // Goto url
          url = $scope.packages.feature.nowPage.url;
          $state.go(url);
        }
      };

      // Next event
      $scope.packages.feature.next = function () {
        $scope.packages.feature.nowPage = null;
        $scope.packages.feature.GotoNextPage();
      };
    }
  }
]);


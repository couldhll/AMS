'use strict';

// Create Packages controller
angular.module('packages').controller('CreatePackagesController', ['$scope', '$stateParams', '$location', 'Authentication', '$state',
  function ($scope, $stateParams, $location, Authentication, $state) {
    $scope.authentication = Authentication;

    // Init packages
    $scope.packages = {};
    $scope.packages.pages = [
      {name: 'info', url: 'packages.create.info'},
      {name: 'feature', url: 'packages.create.feature'},
      {name: 'download', url: 'packages.create.download'},
    ];

    // Goto event
    $scope.packages.GotoNextPage = function() {
      var nowUrl = $state.current.name;

      // Next page
      if ($scope.packages.nowPage == null) {
        $scope.packages.nowPage = $scope.packages.pages[0];
      }
      else {
        for (var i = 0; i < $scope.packages.pages.length; i++) {
          var page = $scope.packages.pages[i];
          if (nowUrl.indexOf(page.url) >= 0) {
            $scope.packages.nowPage = $scope.packages.pages[i + 1];
            break;
          }
        }
      }

      var url = null;
      if ($scope.packages.nowPage == null) {
        // Compleate
      }
      else {
        // Goto url
        url = $scope.packages.nowPage.url;
        $state.go(url);
      }
    };

    // Next event
    $scope.packages.next = function() {
      $scope.packages.GotoNextPage();
    };

    // Goto
    $scope.packages.nowPage = null;
    $scope.packages.GotoNextPage();
  }
]);


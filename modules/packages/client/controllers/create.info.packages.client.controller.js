'use strict';

// Create Info Packages controller
angular.module('packages').controller('CreateInfoPackagesController', ['$scope', '$stateParams', '$location', 'Authentication',
  function ($scope, $stateParams, $location, Authentication) {
    $scope.authentication = Authentication;

    // Init info
    if ($scope.packages.info == null) {
      $scope.packages.info = {};
      $scope.packages.info.version = '1.0';
      $scope.packages.info.durations = [{begin: new Date(), end: new Date()}];
      $scope.packages.info.canRemoveDuration = false;

      // Duration event
      $scope.packages.info.addDuration = function($index) {
        var newDuration = {begin: new Date(), end: new Date()};
        $scope.packages.info.durations.splice($index + 1, 0, newDuration);

        $scope.packages.info.canRemoveDuration = true;
      };
      $scope.packages.info.removeDuration = function($index) {
        if ($scope.packages.info.durations.length > 1) {
          $scope.packages.info.durations.splice($index, 1);
        }

        if ($scope.packages.info.durations.length == 1) {
          $scope.packages.info.canRemoveDuration = false;
        }
      };
    }
  }
]);


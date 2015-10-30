'use strict';

/*jslint eqeq: true*/

// Create Packages controller
angular.module('packages').controller('CreatePackagesController', ['$scope', '$stateParams', '$location', 'Authentication',
  function ($scope, $stateParams, $location, Authentication) {
    $scope.authentication = Authentication;


  }
]);


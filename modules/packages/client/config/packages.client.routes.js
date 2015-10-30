'use strict';

// Setting up route
angular.module('packages').config(['$stateProvider',
  function ($stateProvider) {
    // Packages state routing
    $stateProvider
        .state('packages', {
          abstract: true,
          url: '/packages',
            templateUrl: 'modules/packages/client/views/packages.client.view.html'
        })
        .state('packages.create', {
          url: '/create',
          templateUrl: 'modules/packages/client/views/create-packages.client.view.html'
        });
  }
]);

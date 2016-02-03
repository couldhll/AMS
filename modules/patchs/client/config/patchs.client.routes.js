'use strict';

// Setting up route
angular.module('patchs').config(['$stateProvider',
  function ($stateProvider) {
    // Patchs state routing
    $stateProvider
        .state('patchs', {
          abstract: true,
          url: '/patchs',
          template: '<ui-view/>'
        })
        .state('patchs.manage', {
            url: '/manage',
            templateUrl: 'modules/patchs/client/views/manage-patchs.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        })
        .state('patchs.export', {
          url: '/export',
          templateUrl: 'modules/patchs/client/views/export-patchs.client.view.html'
        });
  }
]);

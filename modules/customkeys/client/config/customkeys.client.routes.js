'use strict';

// Setting up route
angular.module('customkeys').config(['$stateProvider',
  function ($stateProvider) {
    // Customkeys state routing
    $stateProvider
        .state('customkeys', {
          abstract: true,
          url: '/customkeys',
          template: '<ui-view/>'
        })
        .state('customkeys.manage', {
            url: '/manage',
            templateUrl: 'modules/customkeys/client/views/manage-customkeys.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        })
        .state('customkeys.export', {
          url: '/export',
          templateUrl: 'modules/customkeys/client/views/export-customkeys.client.view.html'
        });
  }
]);

'use strict';

// Setting up route
angular.module('superwords').config(['$stateProvider',
  function ($stateProvider) {
    // Emojis state routing
    $stateProvider
        .state('superwords', {
          abstract: true,
          url: '/superwords',
          template: '<ui-view/>'
        })
        .state('superwords.manage', {
            url: '/manage',
            templateUrl: 'modules/superwords/client/views/manage-superwords.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        })
        .state('superwords.export', {
          url: '/export',
          templateUrl: 'modules/superwords/client/views/export-superwords.client.view.html'
        });
  }
]);

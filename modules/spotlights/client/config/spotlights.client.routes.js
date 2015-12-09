'use strict';

// Setting up route
angular.module('spotlights').config(['$stateProvider',
  function ($stateProvider) {
    // Emojis state routing
    $stateProvider
        .state('spotlights', {
          abstract: true,
          url: '/spotlights',
          template: '<ui-view/>'
        })
        .state('spotlights.manage', {
            url: '/manage',
            templateUrl: 'modules/spotlights/client/views/manage-spotlights.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        })
        .state('spotlights.export', {
          url: '/export',
          templateUrl: 'modules/spotlights/client/views/export-spotlights.client.view.html'
        });
  }
]);

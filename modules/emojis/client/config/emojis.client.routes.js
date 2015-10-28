'use strict';

// Setting up route
angular.module('emojis').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
        .state('emojis', {
          abstract: true,
          url: '/emojis',
          template: '<ui-view/>'
        })
        .state('emojis.manage', {
          url: '',
          templateUrl: 'modules/emojis/client/views/manage-emojis.client.view.html',
          data: {
            roles: ['user', 'admin']
          }
        })
        .state('emojis.export', {
          url: '/export',
          templateUrl: 'modules/emojis/client/views/export-emojis.client.view.html'
        });
  }
]);

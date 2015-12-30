'use strict';

// Setting up route
angular.module('discoverycentermenus').config(['$stateProvider',
  function ($stateProvider) {
    // Discoverycentermenus state routing
    $stateProvider
        .state('discoverycentermenus', {
          abstract: true,
          url: '/discoverycentermenus',
          template: '<ui-view/>'
        })
        .state('discoverycentermenus.manage', {
            url: '/manage',
            templateUrl: 'modules/discoverycentermenus/client/views/manage-discoverycentermenus.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        })
        .state('discoverycentermenus.export', {
          url: '/export',
          templateUrl: 'modules/discoverycentermenus/client/views/export-discoverycentermenus.client.view.html'
        });
  }
]);

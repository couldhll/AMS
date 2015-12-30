'use strict';

// Setting up route
angular.module('discoverycenterbanners').config(['$stateProvider',
  function ($stateProvider) {
    // Discoverycenterbanners state routing
    $stateProvider
        .state('discoverycenterbanners', {
          abstract: true,
          url: '/discoverycenterbanners',
          template: '<ui-view/>'
        })
        .state('discoverycenterbanners.manage', {
            url: '/manage',
            templateUrl: 'modules/discoverycenterbanners/client/views/manage-discoverycenterbanners.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        })
        .state('discoverycenterbanners.export', {
          url: '/export',
          templateUrl: 'modules/discoverycenterbanners/client/views/export-discoverycenterbanners.client.view.html'
        });
  }
]);

'use strict';

// Setting up route
angular.module('settingmenus').config(['$stateProvider',
  function ($stateProvider) {
    // Settingmenus state routing
    $stateProvider
        .state('settingmenus', {
          abstract: true,
          url: '/settingmenus',
          template: '<ui-view/>'
        })
        .state('settingmenus.manage', {
            url: '/manage',
            templateUrl: 'modules/settingmenus/client/views/manage-settingmenus.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        })
        .state('settingmenus.export', {
          url: '/export',
          templateUrl: 'modules/settingmenus/client/views/export-settingmenus.client.view.html'
        });
  }
]);

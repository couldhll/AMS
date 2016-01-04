'use strict';

// Setting up route
angular.module('keyboardmenus').config(['$stateProvider',
  function ($stateProvider) {
    // Keyboardmenus state routing
    $stateProvider
        .state('keyboardmenus', {
          abstract: true,
          url: '/keyboardmenus',
          template: '<ui-view/>'
        })
        .state('keyboardmenus.manage', {
            url: '/manage',
            templateUrl: 'modules/keyboardmenus/client/views/manage-keyboardmenus.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        })
        .state('keyboardmenus.export', {
          url: '/export',
          templateUrl: 'modules/keyboardmenus/client/views/export-keyboardmenus.client.view.html'
        });
  }
]);

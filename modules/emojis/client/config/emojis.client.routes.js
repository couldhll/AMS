'use strict';

// Setting up route
angular.module('emojis').config(['$stateProvider',
  function ($stateProvider) {
    // Emojis state routing
    $stateProvider
        .state('emojis', {
          abstract: true,
          url: '/emojis',
          template: '<ui-view/>'
        })
        .state('emojis.manage', {
            abstract: true,
            url: '/manage',
            template: '<ui-view/>'
        })
        .state('emojis.manage.emojis', {
          url: '/emojis',
          templateUrl: 'modules/emojis/client/views/emojis-manage-emojis.client.view.html',
          data: {
            roles: ['user', 'admin']
          }
        })
        .state('emojis.manage.emoticons', {
            url: '/emoticons',
            templateUrl: 'modules/emojis/client/views/emoticons-manage-emojis.client.view.html',
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

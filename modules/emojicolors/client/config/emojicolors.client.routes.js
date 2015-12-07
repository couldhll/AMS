'use strict';

// Setting up route
angular.module('emojicolors').config(['$stateProvider',
  function ($stateProvider) {
    // Emojis state routing
    $stateProvider
        .state('emojicolors', {
          abstract: true,
          url: '/emojicolors',
          template: '<ui-view/>'
        })
        .state('emojicolors.manage', {
            url: '/manage',
            templateUrl: 'modules/emojicolors/client/views/manage-emojicolors.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        })
        .state('emojicolors.export', {
          url: '/export',
          templateUrl: 'modules/emojicolors/client/views/export-emojicolors.client.view.html'
        });
  }
]);

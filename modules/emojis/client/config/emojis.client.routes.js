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
      .state('emojis.list', {
        url: '',
        templateUrl: 'modules/emojis/client/views/list-emojis.client.view.html'
      })
      .state('emojis.create', {
        url: '/create',
        templateUrl: 'modules/emojis/client/views/create-emojis.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('emojis.view', {
        url: '/:emojiId',
        templateUrl: 'modules/emojis/client/views/view-emojis.client.view.html'
      })
      .state('emojis.edit', {
        url: '/:emojiId/edit',
        templateUrl: 'modules/emojis/client/views/edit-emojis.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);

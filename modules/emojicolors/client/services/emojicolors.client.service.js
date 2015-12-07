'use strict';

//Emojicolors service used for communicating with the emojicolors REST endpoints
angular.module('emojicolors').factory('Emojicolors', ['$resource',
  function ($resource) {
    return $resource('api/emojicolors/:emojicolorId', {
      emojicolorId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      'getFromGroup': {
        method:'GET',
        params: {
          emojicolorGroupId: '@_id'
        },
        url: '/api/emojicolorGroups/:emojicolorGroupId/emojicolors',
        isArray: true
      }
    });
  }
]);

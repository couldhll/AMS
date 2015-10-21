'use strict';

//Emojis service used for communicating with the emojis REST endpoints
angular.module('emojis').factory('Emojis', ['$resource',
  function ($resource) {
    return $resource('api/emojis/:emojiId', {
      emojiId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      'getFromGroup': {
        method:'GET',
        params: {
          emojiGroupId: '@_id'
        },
        url: '/api/emojiGroups/:emojiGroupId/emojis',
        isArray: true
      }
    });
  }
]);

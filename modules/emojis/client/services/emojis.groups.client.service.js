'use strict';

//EmojiGroups service used for communicating with the emoji groups REST endpoints
angular.module('emojis.groups').factory('EmojiGroups', ['$resource',
  function ($resource) {
    return $resource('api/emojiGroups/:emojiGroupId', {
      emojiGroupId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

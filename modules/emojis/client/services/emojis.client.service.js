'use strict';

//Emojis service used for communicating with the articles REST endpoints
angular.module('emojis').factory('Emojis', ['$resource',
  function ($resource) {
    return $resource('api/emojis/:emojiId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

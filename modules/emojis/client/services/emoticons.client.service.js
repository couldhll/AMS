'use strict';

//Emoticons service used for communicating with the emoticons REST endpoints
angular.module('emojis').factory('Emoticons', ['$resource',
  function ($resource) {
    return $resource('api/emoticons/:emoticonId', {
      emoticonId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      'getFromGroup': {
        method:'GET',
        params: {
          emoticonGroupId: '@_id'
        },
        url: '/api/emoticonGroups/:emoticonGroupId/emoticons',
        isArray: true
      }
    });
  }
]);

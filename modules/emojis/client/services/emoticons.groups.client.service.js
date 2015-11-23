'use strict';

//EmoticonGroups service used for communicating with the emoticon groups REST endpoints
angular.module('emojis.groups').factory('EmoticonGroups', ['$resource',
  function ($resource) {
    return $resource('api/emoticonGroups/:emoticonGroupId', {
      emoticonGroupId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

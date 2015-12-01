'use strict';

//SuperwordGroups service used for communicating with the superword groups REST endpoints
angular.module('superwords.groups').factory('SuperwordGroups', ['$resource',
  function ($resource) {
    return $resource('api/superwordGroups/:superwordGroupId', {
      superwordGroupId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

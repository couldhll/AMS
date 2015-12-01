'use strict';

//Superwords service used for communicating with the superwords REST endpoints
angular.module('superwords').factory('Superwords', ['$resource',
  function ($resource) {
    return $resource('api/superwords/:superwordId', {
      superwordId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      'getFromGroup': {
        method:'GET',
        params: {
          superwordGroupId: '@_id'
        },
        url: '/api/superwordGroups/:superwordGroupId/superwords',
        isArray: true
      }
    });
  }
]);

'use strict';

//Spotlights service used for communicating with the spotlights REST endpoints
angular.module('spotlights').factory('Spotlights', ['$resource',
  function ($resource) {
    return $resource('api/spotlights/:spotlightId', {
      spotlightId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      'getFromGroup': {
        method:'GET',
        params: {
          spotlightGroupId: '@_id'
        },
        url: '/api/spotlightGroups/:spotlightGroupId/spotlights',
        isArray: true
      }
    });
  }
]);

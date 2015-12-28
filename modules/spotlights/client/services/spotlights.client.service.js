'use strict';

//Spotlights service used for communicating with the spotlights REST endpoints
angular.module('spotlights').factory('Spotlights', ['$resource',
  function ($resource) {
    return $resource('api/spotlights/:spotlightId', {
      spotlightId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

'use strict';

//Patchs service used for communicating with the patchs REST endpoints
angular.module('patchs').factory('Patchs', ['$resource',
  function ($resource) {
    return $resource('api/patchs/:patchId', {
      patchId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

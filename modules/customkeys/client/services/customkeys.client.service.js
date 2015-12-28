'use strict';

//Customkeys service used for communicating with the customkeys REST endpoints
angular.module('customkeys').factory('Customkeys', ['$resource',
  function ($resource) {
    return $resource('api/customkeys/:customkeyId', {
      customkeyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

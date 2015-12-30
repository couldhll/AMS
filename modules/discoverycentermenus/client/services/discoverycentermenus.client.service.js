'use strict';

//Discoverycentermenus service used for communicating with the discoverycentermenus REST endpoints
angular.module('discoverycentermenus').factory('Discoverycentermenus', ['$resource',
  function ($resource) {
    return $resource('api/discoverycentermenus/:discoverycentermenuId', {
      discoverycentermenuId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

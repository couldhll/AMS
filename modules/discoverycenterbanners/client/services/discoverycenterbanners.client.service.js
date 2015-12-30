'use strict';

//Discoverycenterbanners service used for communicating with the discoverycenterbanners REST endpoints
angular.module('discoverycenterbanners').factory('Discoverycenterbanners', ['$resource',
  function ($resource) {
    return $resource('api/discoverycenterbanners/:discoverycenterbannerId', {
      discoverycenterbannerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

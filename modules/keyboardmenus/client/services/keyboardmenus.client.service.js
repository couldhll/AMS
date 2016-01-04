'use strict';

//Keyboardmenus service used for communicating with the keyboardmenus REST endpoints
angular.module('keyboardmenus').factory('Keyboardmenus', ['$resource',
  function ($resource) {
    return $resource('api/keyboardmenus/:keyboardmenuId', {
      keyboardmenuId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

'use strict';

//Settingmenus service used for communicating with the settingmenus REST endpoints
angular.module('settingmenus').factory('Settingmenus', ['$resource',
  function ($resource) {
    return $resource('api/settingmenus/:settingmenuId', {
      settingmenuId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

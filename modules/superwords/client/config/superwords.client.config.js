'use strict';

// Configuring the Superwords module
angular.module('superwords').run(['Menus',
  function (Menus) {
    // Add the superwords dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Superwords',
      state: 'superwords',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown manage item
    Menus.addSubMenuItem('topbar', 'superwords', {
      title: 'Manage Superwords',
      state: 'superwords.manage',
      roles: ['user']
    });

    // Add the dropdown export item
    Menus.addSubMenuItem('topbar', 'superwords', {
      title: 'Export Superword',
      state: 'superwords.export',
      roles: ['*']
    });
  }
]);

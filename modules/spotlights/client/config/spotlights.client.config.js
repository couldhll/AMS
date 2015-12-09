'use strict';

// Configuring the Spotlights module
angular.module('spotlights').run(['Menus',
  function (Menus) {
    // Add the spotlights dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Spotlights',
      state: 'spotlights',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown manage item
    Menus.addSubMenuItem('topbar', 'spotlights', {
      title: 'Manage Spotlights',
      state: 'spotlights.manage',
      roles: ['user']
    });

    // Add the dropdown export item
    Menus.addSubMenuItem('topbar', 'spotlights', {
      title: 'Export Spotlight',
      state: 'spotlights.export',
      roles: ['*']
    });
  }
]);

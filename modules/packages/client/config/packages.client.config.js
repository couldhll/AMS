'use strict';

// Configuring the Packages module
angular.module('packages').run(['Menus',
  function (Menus) {
    // Add the packages dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Packages',
      state: 'packages',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'packages', {
      title: 'Create package',
      state: 'packages.create',
      roles: ['*']
    });
  }
]);

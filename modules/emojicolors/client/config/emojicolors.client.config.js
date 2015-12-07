'use strict';

// Configuring the Emojicolors module
angular.module('emojicolors').run(['Menus',
  function (Menus) {
    // Add the emojicolors dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Emojicolors',
      state: 'emojicolors',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown manage item
    Menus.addSubMenuItem('topbar', 'emojicolors', {
      title: 'Manage Emojicolors',
      state: 'emojicolors.manage',
      roles: ['user']
    });

    // Add the dropdown export item
    Menus.addSubMenuItem('topbar', 'emojicolors', {
      title: 'Export Emojicolor',
      state: 'emojicolors.export',
      roles: ['*']
    });
  }
]);

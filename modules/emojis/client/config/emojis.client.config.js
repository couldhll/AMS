'use strict';

// Configuring the Articles module
angular.module('emojis').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Emojis',
      state: 'emojis',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'emojis', {
      title: 'Manage Emoji',
      state: 'emojis.manage',
      roles: ['user']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'emojis', {
      title: 'Export Emoji',
      state: 'emojis.export',
      roles: ['*']
    });
  }
]);

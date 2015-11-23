'use strict';

// Configuring the Emojis module
angular.module('emojis').run(['Menus',
  function (Menus) {
    // Add the emojis dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Emojis',
      state: 'emojis',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown manage item
    Menus.addSubMenuItem('topbar', 'emojis', {
      title: 'Manage Emoji',
      state: 'emojis.manage.emojis',
      roles: ['user']
    });

    // Add the dropdown manage item
    Menus.addSubMenuItem('topbar', 'emojis', {
      title: 'Manage Emoticon',
      state: 'emojis.manage.emoticons',
      roles: ['user']
    });

    // Add the dropdown export item
    Menus.addSubMenuItem('topbar', 'emojis', {
      title: 'Export Emoji',
      state: 'emojis.export',
      roles: ['*']
    });
  }
]);

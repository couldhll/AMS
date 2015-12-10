'use strict';

// Configuring the Emojis module
angular.module('emojis').run(['Menus', '$translate', '$rootScope',
  function (Menus, $translate, $rootScope) {
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['MENU_EMOJI', 'MENU_EMOJI_MANAGE_EMOJI', 'MENU_EMOJI_MANAGE_EMOTICON', 'MENU_EMOJI_EXPORT']).then(function (translations) {
        // Remove the menu item
        Menus.removeMenuItem('topbar', 'emojis');

        // Add the emojis dropdown item
        Menus.addMenuItem('topbar', {
          title: translations.MENU_EMOJI,
          state: 'emojis',
          type: 'dropdown',
          roles: ['*']
        });

        // Add the dropdown manage item
        Menus.addSubMenuItem('topbar', 'emojis', {
          title: translations.MENU_EMOJI_MANAGE_EMOJI,
          state: 'emojis.manage.emojis',
          roles: ['user']
        });

        // Add the dropdown manage item
        Menus.addSubMenuItem('topbar', 'emojis', {
          title: translations.MENU_EMOJI_MANAGE_EMOTICON,
          state: 'emojis.manage.emoticons',
          roles: ['user']
        });

        // Add the dropdown export item
        Menus.addSubMenuItem('topbar', 'emojis', {
          title: translations.MENU_EMOJI_EXPORT,
          state: 'emojis.export',
          roles: ['*']
        });
      });
    });
  }
]);

'use strict';

// Configuring the Emojicolors module
angular.module('emojicolors').run(['Menus', '$translate', '$rootScope',
  function (Menus, $translate, $rootScope) {
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['MENU_EMOJICOLOR', 'MENU_EMOJICOLOR_MANAGE', 'MENU_EMOJICOLOR_EXPORT']).then(function (translations) {
        // Remove the menu item
        Menus.removeMenuItem('topbar', 'emojicolors');

        // Add the emojicolors dropdown item
        Menus.addMenuItem('topbar', {
          title: translations.MENU_EMOJICOLOR,
          state: 'emojicolors',
          type: 'dropdown',
          roles: ['*']
        });

        // Add the dropdown manage item
        Menus.addSubMenuItem('topbar', 'emojicolors', {
          title: translations.MENU_EMOJICOLOR_MANAGE,
          state: 'emojicolors.manage',
          roles: ['user']
        });

        // Add the dropdown export item
        Menus.addSubMenuItem('topbar', 'emojicolors', {
          title: translations.MENU_EMOJICOLOR_EXPORT,
          state: 'emojicolors.export',
          roles: ['*']
        });
      });
    });
  }
]);

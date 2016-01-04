'use strict';

// Configuring the Keyboardmenus module
angular.module('keyboardmenus').run(['Menus', '$translate', '$rootScope',
  function (Menus, $translate, $rootScope) {
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['MENU_KEYBOARDMENU', 'MENU_KEYBOARDMENU_MANAGE', 'MENU_KEYBOARDMENU_EXPORT']).then(function (translations) {
        // Remove the menu item
        Menus.removeMenuItem('topbar', 'keyboardmenus');

        // Add the keyboardmenus dropdown item
        Menus.addMenuItem('topbar', {
          title: translations.MENU_KEYBOARDMENU,
          state: 'keyboardmenus',
          type: 'dropdown',
          roles: ['*']
        });

        // Add the dropdown manage item
        Menus.addSubMenuItem('topbar', 'keyboardmenus', {
          title: translations.MENU_KEYBOARDMENU_MANAGE,
          state: 'keyboardmenus.manage',
          roles: ['user']
        });

        // Add the dropdown export item
        Menus.addSubMenuItem('topbar', 'keyboardmenus', {
          title: translations.MENU_KEYBOARDMENU_EXPORT,
          state: 'keyboardmenus.export',
          roles: ['*']
        });
      });
    });
  }
]);

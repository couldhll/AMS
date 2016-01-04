'use strict';

// Configuring the Settingmenus module
angular.module('settingmenus').run(['Menus', '$translate', '$rootScope',
  function (Menus, $translate, $rootScope) {
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['MENU_SETTINGMENU', 'MENU_SETTINGMENU_MANAGE', 'MENU_SETTINGMENU_EXPORT']).then(function (translations) {
        // Remove the menu item
        Menus.removeMenuItem('topbar', 'settingmenus');

        // Add the settingmenus dropdown item
        Menus.addMenuItem('topbar', {
          title: translations.MENU_SETTINGMENU,
          state: 'settingmenus',
          type: 'dropdown',
          roles: ['*']
        });

        // Add the dropdown manage item
        Menus.addSubMenuItem('topbar', 'settingmenus', {
          title: translations.MENU_SETTINGMENU_MANAGE,
          state: 'settingmenus.manage',
          roles: ['user']
        });

        // Add the dropdown export item
        Menus.addSubMenuItem('topbar', 'settingmenus', {
          title: translations.MENU_SETTINGMENU_EXPORT,
          state: 'settingmenus.export',
          roles: ['*']
        });
      });
    });
  }
]);

'use strict';

// Configuring the Discoverycentermenus module
angular.module('discoverycentermenus').run(['Menus', '$translate', '$rootScope',
  function (Menus, $translate, $rootScope) {
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['MENU_DISCOVERYCENTERMENU', 'MENU_DISCOVERYCENTERMENU_MANAGE', 'MENU_DISCOVERYCENTERMENU_EXPORT']).then(function (translations) {
        // Remove the menu item
        Menus.removeMenuItem('topbar', 'discoverycentermenus');

        // Add the discoverycentermenus dropdown item
        Menus.addMenuItem('topbar', {
          title: translations.MENU_DISCOVERYCENTERMENU,
          state: 'discoverycentermenus',
          type: 'dropdown',
          roles: ['*']
        });

        // Add the dropdown manage item
        Menus.addSubMenuItem('topbar', 'discoverycentermenus', {
          title: translations.MENU_DISCOVERYCENTERMENU_MANAGE,
          state: 'discoverycentermenus.manage',
          roles: ['user']
        });

        // Add the dropdown export item
        Menus.addSubMenuItem('topbar', 'discoverycentermenus', {
          title: translations.MENU_DISCOVERYCENTERMENU_EXPORT,
          state: 'discoverycentermenus.export',
          roles: ['*']
        });
      });
    });
  }
]);

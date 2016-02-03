'use strict';

// Configuring the Patchs module
angular.module('patchs').run(['Menus', '$translate', '$rootScope',
  function (Menus, $translate, $rootScope) {
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['MENU_PATCH', 'MENU_PATCH_MANAGE', 'MENU_PATCH_EXPORT']).then(function (translations) {
        // Remove the menu item
        Menus.removeMenuItem('topbar', 'patchs');

        // Add the patchs dropdown item
        Menus.addMenuItem('topbar', {
          title: translations.MENU_PATCH,
          state: 'patchs',
          type: 'dropdown',
          roles: ['*'],
          position: 1000
        });

        // Add the dropdown manage item
        Menus.addSubMenuItem('topbar', 'patchs', {
          title: translations.MENU_PATCH_MANAGE,
          state: 'patchs.manage',
          roles: ['user']
        });

        // Add the dropdown export item
        Menus.addSubMenuItem('topbar', 'patchs', {
          title: translations.MENU_PATCH_EXPORT,
          state: 'patchs.export',
          roles: ['*']
        });
      });
    });
  }
]);

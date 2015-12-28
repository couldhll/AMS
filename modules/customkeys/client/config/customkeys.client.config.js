'use strict';

// Configuring the Customkeys module
angular.module('customkeys').run(['Menus', '$translate', '$rootScope',
  function (Menus, $translate, $rootScope) {
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['MENU_CUSTOMKEY', 'MENU_CUSTOMKEY_MANAGE', 'MENU_CUSTOMKEY_EXPORT']).then(function (translations) {
        // Remove the menu item
        Menus.removeMenuItem('topbar', 'customkeys');

        // Add the customkeys dropdown item
        Menus.addMenuItem('topbar', {
          title: translations.MENU_CUSTOMKEY,
          state: 'customkeys',
          type: 'dropdown',
          roles: ['*']
        });

        // Add the dropdown manage item
        Menus.addSubMenuItem('topbar', 'customkeys', {
          title: translations.MENU_CUSTOMKEY_MANAGE,
          state: 'customkeys.manage',
          roles: ['user']
        });

        // Add the dropdown export item
        Menus.addSubMenuItem('topbar', 'customkeys', {
          title: translations.MENU_CUSTOMKEY_EXPORT,
          state: 'customkeys.export',
          roles: ['*']
        });
      });
    });
  }
]);

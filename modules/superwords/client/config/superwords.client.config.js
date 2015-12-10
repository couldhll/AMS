'use strict';

// Configuring the Superwords module
angular.module('superwords').run(['Menus', '$translate', '$rootScope',
  function (Menus, $translate, $rootScope) {
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['MENU_SUPERWORD', 'MENU_SUPERWORD_MANAGE', 'MENU_SUPERWORD_EXPORT']).then(function (translations) {
        // Remove the menu item
        Menus.removeMenuItem('topbar', 'superwords');

        // Add the superwords dropdown item
        Menus.addMenuItem('topbar', {
          title: translations.MENU_SUPERWORD,
          state: 'superwords',
          type: 'dropdown',
          roles: ['*']
        });

        // Add the dropdown manage item
        Menus.addSubMenuItem('topbar', 'superwords', {
          title: translations.MENU_SUPERWORD_MANAGE,
          state: 'superwords.manage',
          roles: ['user']
        });

        // Add the dropdown export item
        Menus.addSubMenuItem('topbar', 'superwords', {
          title: translations.MENU_SUPERWORD_EXPORT,
          state: 'superwords.export',
          roles: ['*']
        });
      });
    });
  }
]);

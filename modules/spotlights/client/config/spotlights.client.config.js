'use strict';

// Configuring the Spotlights module
angular.module('spotlights').run(['Menus', '$translate', '$rootScope',
  function (Menus, $translate, $rootScope) {
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['MENU_SPOTLIGHT', 'MENU_SPOTLIGHT_MANAGE', 'MENU_SPOTLIGHT_EXPORT']).then(function (translations) {
        // Remove the menu item
        Menus.removeMenuItem('topbar', 'spotlights');

        // Add the spotlights dropdown item
        Menus.addMenuItem('topbar', {
          title: translations.MENU_SPOTLIGHT,
          state: 'spotlights',
          type: 'dropdown',
          roles: ['*']
        });

        // Add the dropdown manage item
        Menus.addSubMenuItem('topbar', 'spotlights', {
          title: translations.MENU_SPOTLIGHT_MANAGE,
          state: 'spotlights.manage',
          roles: ['user']
        });

        // Add the dropdown export item
        Menus.addSubMenuItem('topbar', 'spotlights', {
          title: translations.MENU_SPOTLIGHT_EXPORT,
          state: 'spotlights.export',
          roles: ['*']
        });
      });
    });
  }
]);

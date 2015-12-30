'use strict';

// Configuring the Discoverycenterbanners module
angular.module('discoverycenterbanners').run(['Menus', '$translate', '$rootScope',
  function (Menus, $translate, $rootScope) {
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['MENU_DISCOVERYCENTERBANNER', 'MENU_DISCOVERYCENTERBANNER_MANAGE', 'MENU_DISCOVERYCENTERBANNER_EXPORT']).then(function (translations) {
        // Remove the menu item
        Menus.removeMenuItem('topbar', 'discoverycenterbanners');

        // Add the discoverycenterbanners dropdown item
        Menus.addMenuItem('topbar', {
          title: translations.MENU_DISCOVERYCENTERBANNER,
          state: 'discoverycenterbanners',
          type: 'dropdown',
          roles: ['*']
        });

        // Add the dropdown manage item
        Menus.addSubMenuItem('topbar', 'discoverycenterbanners', {
          title: translations.MENU_DISCOVERYCENTERBANNER_MANAGE,
          state: 'discoverycenterbanners.manage',
          roles: ['user']
        });

        // Add the dropdown export item
        Menus.addSubMenuItem('topbar', 'discoverycenterbanners', {
          title: translations.MENU_DISCOVERYCENTERBANNER_EXPORT,
          state: 'discoverycenterbanners.export',
          roles: ['*']
        });
      });
    });
  }
]);

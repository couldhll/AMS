'use strict';

// Configuring the Packages module
angular.module('packages').run(['Menus', '$translate', '$rootScope',
  function (Menus, $translate, $rootScope) {
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['MENU_PACKAGE', 'MENU_PACKAGE_CREATE']).then(function (translations) {
        // Remove the menu item
        Menus.removeMenuItem('topbar', 'packages');

        // Add the packages dropdown item
        Menus.addMenuItem('topbar', {
          title: translations.MENU_PACKAGE,
          state: 'packages',
          type: 'dropdown',
          roles: ['*'],
          position: 100
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'packages', {
          title: translations.MENU_PACKAGE_CREATE,
          state: 'packages.create',
          roles: ['*']
        });
      });
    });
  }
]);

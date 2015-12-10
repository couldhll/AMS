'use strict';

// Create Packages controller
angular.module('packages').controller('CreatePackagesController', ['$scope', '$stateParams', '$location', 'Authentication', '$state', '$translate', '$rootScope',
  function ($scope, $stateParams, $location, Authentication, $state, $translate, $rootScope) {
    $scope.authentication = Authentication;

    // Init packages
    $scope.packages = {};
    $translate(['PACKAGE_CREATE_STEP_INFO_TITLE', 'PACKAGE_CREATE_STEP_FEATURE_TITLE', 'PACKAGE_CREATE_STEP_DOWNLOAD_TITLE']).then(function (translations) {
      $scope.packages.pages = [
        {name: translations.PACKAGE_CREATE_STEP_INFO_TITLE, url: 'packages.create.info'},
        {name: translations.PACKAGE_CREATE_STEP_FEATURE_TITLE, url: 'packages.create.feature'},
        {name: translations.PACKAGE_CREATE_STEP_DOWNLOAD_TITLE, url: 'packages.create.download'}
      ];

      // Goto
      $scope.packages.nowPage = null;
      $scope.packages.GotoNextPage();
    });

    // Translate
    $rootScope.$on('$translateChangeSuccess', function () {
      $translate(['PACKAGE_CREATE_STEP_INFO_TITLE', 'PACKAGE_CREATE_STEP_FEATURE_TITLE', 'PACKAGE_CREATE_STEP_DOWNLOAD_TITLE']).then(function (translations) {
        $scope.packages.pages = [
          {name: translations.PACKAGE_CREATE_STEP_INFO_TITLE, url: 'packages.create.info'},
          {name: translations.PACKAGE_CREATE_STEP_FEATURE_TITLE, url: 'packages.create.feature'},
          {name: translations.PACKAGE_CREATE_STEP_DOWNLOAD_TITLE, url: 'packages.create.download'}
        ];
      });
    });

    // Goto event
    $scope.packages.GotoNextPage = function() {
      var nowUrl = $state.current.name;

      // Next page
      if ($scope.packages.nowPage == null) {
        $scope.packages.nowPage = $scope.packages.pages[0];
      }
      else {
        for (var i = 0; i < $scope.packages.pages.length; i++) {
          var page = $scope.packages.pages[i];
          if (nowUrl.indexOf(page.url) >= 0) {
            $scope.packages.nowPage = $scope.packages.pages[i + 1];
            break;
          }
        }
      }

      var url = null;
      if ($scope.packages.nowPage == null) {
        // Compleate
      }
      else {
        // Goto url
        url = $scope.packages.nowPage.url;
        $state.go(url);
      }
    };

    // Next event
    $scope.packages.next = function() {
      $scope.packages.GotoNextPage();
    };
  }
]);


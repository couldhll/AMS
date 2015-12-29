'use strict';

// Create Feature Packages controller
angular.module('packages').controller('CreateFeaturePackagesController', ['$scope', '$stateParams', '$location', 'Authentication', '$state', '$translate', '$rootScope',
  function ($scope, $stateParams, $location, Authentication, $state, $translate, $rootScope) {
    $scope.authentication = Authentication;

    // Init feature
    if ($scope.packages.feature == null) {
      $scope.packages.feature = {};
      $translate(['PACKAGE_CREATE_STEP_FEATURE_EMOJI', 'PACKAGE_CREATE_STEP_FEATURE_EMOJICOLOR', 'PACKAGE_CREATE_STEP_FEATURE_SUPERWORD', 'PACKAGE_CREATE_STEP_FEATURE_SPOTLIGHT']).then(function (translations) {
        $scope.packages.feature.pages = [
          {name: translations.PACKAGE_CREATE_STEP_FEATURE_EMOJI, url: '^.emojis'},
          {name: translations.PACKAGE_CREATE_STEP_FEATURE_EMOJICOLOR, url: '^.emojicolors'},
          {name: translations.PACKAGE_CREATE_STEP_FEATURE_CUSTOMKEY, url: '^.customkeys'},
          {name: translations.PACKAGE_CREATE_STEP_FEATURE_SUPERWORD, url: '^.superwords'},
          {name: translations.PACKAGE_CREATE_STEP_FEATURE_SPOTLIGHT, url: '^.spotlights'}
        ];
      });

      // Translate
      $rootScope.$on('$translateChangeSuccess', function () {
        $translate(['PACKAGE_CREATE_STEP_FEATURE_EMOJI', 'PACKAGE_CREATE_STEP_FEATURE_EMOJICOLOR', 'PACKAGE_CREATE_STEP_FEATURE_SUPERWORD', 'PACKAGE_CREATE_STEP_FEATURE_SPOTLIGHT']).then(function (translations) {
          $scope.packages.feature.pages = [
            {name: translations.PACKAGE_CREATE_STEP_FEATURE_EMOJI, url: '^.emojis'},
            {name: translations.PACKAGE_CREATE_STEP_FEATURE_EMOJICOLOR, url: '^.emojicolors'},
            {name: translations.PACKAGE_CREATE_STEP_FEATURE_CUSTOMKEY, url: '^.customkeys'},
            {name: translations.PACKAGE_CREATE_STEP_FEATURE_SUPERWORD, url: '^.superwords'},
            {name: translations.PACKAGE_CREATE_STEP_FEATURE_SPOTLIGHT, url: '^.spotlights'}
          ];
        });
      });

      // Goto event
      $scope.packages.feature.GotoNextPage = function() {
        // Next feature
        if ($scope.packages.feature.nowPage == null) {
          $scope.packages.feature.nowPage = $scope.packages.feature.selectPages[0];
        }
        else {
          for (var i = 0; i < $scope.packages.feature.selectPages.length; i++) {
            var selectPage = $scope.packages.feature.selectPages[i];
            if (selectPage == $scope.packages.feature.nowPage) {
              $scope.packages.feature.nowPage = $scope.packages.feature.selectPages[i + 1];
              break;
            }
          }
        }

        var url = null;
        if ($scope.packages.feature.nowPage == null) {
          // Next part
          $scope.packages.GotoNextPage();
        }
        else {
          // Goto url
          url = $scope.packages.feature.nowPage.url;
          $state.go(url);
        }
      };

      // Next event
      $scope.packages.feature.next = function () {
        $scope.packages.feature.nowPage = null;
        $scope.packages.feature.GotoNextPage();
      };
    }
  }
]);


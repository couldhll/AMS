'use strict';

// Setting up route
angular.module('packages').config(['$stateProvider',
  function ($stateProvider) {
    // Packages state routing
    $stateProvider
        .state('packages', {
            abstract: true,
            url: '/packages',
            template: '<ui-view/>'
        })
        .state('packages.create', {
          url: '/create',
          templateUrl: 'modules/packages/client/views/create-packages.client.view.html'
        })
        .state('packages.create.info', {
            url: '/info',
            templateUrl: 'modules/packages/client/views/create-info-packages.client.view.html'
        })
        .state('packages.create.feature', {
            url: '/feature',
            template: '<ui-view/>',
            controller: function($state){
                $state.go('.choose');// default go to choose page
            }
        })
        .state('packages.create.feature.choose', {
            url: '/choose',
            templateUrl: 'modules/packages/client/views/create-feature-choose-packages.client.view.html'
        })
        .state('packages.create.feature.emojis', {
            url: '/emojis',
            templateUrl: 'modules/emojis/client/views/export-emojis.client.view.html'
        })
        .state('packages.create.feature.emojicolors', {
            url: '/emojicolors',
            templateUrl: 'modules/emojicolors/client/views/export-emojicolors.client.view.html'
        })
        .state('packages.create.feature.customkeys', {
            url: '/customkeys',
            templateUrl: 'modules/customkeys/client/views/export-customkeys.client.view.html'
        })
        .state('packages.create.feature.superwords', {
            url: '/superwords',
            templateUrl: 'modules/superwords/client/views/export-superwords.client.view.html'
        })
        .state('packages.create.feature.spotlights', {
            url: '/spotlights',
            templateUrl: 'modules/spotlights/client/views/export-spotlights.client.view.html'
        })
        .state('packages.create.download', {
            url: '/download',
            templateUrl: 'modules/packages/client/views/create-download-packages.client.view.html'
        });
  }
]);

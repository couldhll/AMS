'use strict';

// Setting up route
angular.module('core').config(['$translateProvider',
  function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: '/modules/core/client/languages/',
      suffix: '.json'
    });
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.preferredLanguage('cn');
    $translateProvider.useLocalStorage();
  }]);

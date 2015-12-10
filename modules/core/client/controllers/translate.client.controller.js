'use strict';

angular.module('core').controller('TranslateController', ['$scope', '$translate',
  function ($scope, $translate) {
    $scope.changeLanguage = function (language) {
      $translate.use(language);
    };
  }
]);

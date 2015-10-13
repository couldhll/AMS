'use strict';

// Emoji controller
angular.module('emojis').controller('EmojisController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emojis',
  function ($scope, $stateParams, $location, Authentication, Emojis) {
    $scope.authentication = Authentication;

    // Create new Emoji
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'emojiForm');

        return false;
      }

      // Create new Emoji object
      var emoji = new Emojis({
        title: this.title
      });

      // Redirect after save
      emoji.$save(function (response) {
        $location.path('emojis/' + response._id);

        // Clear form fields
        $scope.title = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Emoji
    $scope.remove = function (emoji) {
      if (emoji) {
        emoji.$remove();

        for (var i in $scope.emoji) {
          if ($scope.emojis[i] === emoji) {
            $scope.emojis.splice(i, 1);
          }
        }
      } else {
        $scope.emojis.$remove(function () {
          $location.path('emojis');
        });
      }
    };

    // Update existing Emoji
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'emojiForm');

        return false;
      }

      var emoji = $scope.emoji;

      emoji.$update(function () {
        $location.path('emojis/' + emoji._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Emoji
    $scope.find = function () {
      $scope.emojis = Emojis.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.emoji = Emojis.get({
        emojiId: $stateParams.emojiId
      });
    };
  }
]);

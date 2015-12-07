'use strict';

angular.module('core')
    .filter('mapGroup', function() {
        return function(input, show) {
            if (!input){
                return '';
            } else {
                return show;
            }
        };
    });

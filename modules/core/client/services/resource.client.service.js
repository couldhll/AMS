'use strict';

// Resource service for resource file
angular.module('core').service('Resource', function () {
        // Resource file
        this.addSuffixFileName = function (fileName, suffix)
        {
            var fileNameWithSuffix = fileName.replace(/(\.)/,suffix+'$1');
            return fileNameWithSuffix;
        };
        this.get1xFileName = function (fileName) {
            return fileName;
        };

        this.get2xFileName = function (fileName) {
            return this.addSuffixFileName(fileName, '@2x');
        };

        this.get3xFileName = function (fileName) {
            return this.addSuffixFileName(fileName, '@3x');
        };
    }
);

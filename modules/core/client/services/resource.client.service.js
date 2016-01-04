'use strict';

// Resource service for resource file
angular.module('core').service('Resource', function () {
        // Resource file
        this.addSuffixFileName = function (fileName, suffix)
        {
            var fileNameWithSuffix = fileName.replace(/(\.)/,suffix+'$1');
            return fileNameWithSuffix;
        };

        this.getiPadFileName = function (fileName) {
            return this.addSuffixFileName(fileName, '_ipad');
        };
        this.getiPhoneFileName = function (fileName) {
            return this.addSuffixFileName(fileName, '_iphone');
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

        this.getiPad1xFileName = function (fileName) {
            return this.get1xFileName(this.getiPadFileName(fileName));
        };
        this.getiPad2xFileName = function (fileName) {
            return this.get2xFileName(this.getiPadFileName(fileName));
        };
        this.getiPhone2xFileName = function (fileName) {
            return this.get2xFileName(this.getiPhoneFileName(fileName));
        };
        this.getiPhone3xFileName = function (fileName) {
            return this.get3xFileName(this.getiPhoneFileName(fileName));
        };
    }
);

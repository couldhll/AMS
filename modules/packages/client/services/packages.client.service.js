'use strict';

// Download service for download file
angular.module('packages').service('Packages', function () {
        // Version convert string=>number
        this.versionStringToNumber = function (versionString) {
            var versionNumber;

            if (versionString=='') {
                versionNumber = Number.MAX_VALUE;
            }
            else {
                versionNumber = parseFloat(versionString);
            }

            return versionNumber;
        };

        // Version compare
        if(typeof this.VersionCompareResult == "undefined"){
            this.VersionCompareResult = {
                SAME: 1,
                BIG: 2,
                SMALL: 3
            };
        }
        this.versionCompare = function (versionString1, versionString2) {
            var versionNumber1 = this.versionStringToNumber(versionString1);
            var versionNumber2 = this.versionStringToNumber(versionString2);

            var result;
            if (versionNumber1>versionNumber2) {// >
                result = this.VersionCompareResult.BIG;
            }
            else if (versionNumber1<versionNumber2) {// <
                result = this.VersionCompareResult.SMALL;
            }
            else {// =
                result = this.VersionCompareResult.SAME;
            }
            return result;
        };

        // Version contain
        if(typeof this.VersionContainResult == "undefined"){
            this.VersionContainResult = {
                Contain: 1,
                Over: 2
            };
        }
        this.versionContain = function (versionDuration1, versionDuration2) {
            var result;

            var startContain = this.versionCompare(versionDuration1.start,versionDuration2.start);
            var endContain = this.versionCompare(versionDuration1.end,versionDuration2.end);

            var isStartContain = (startContain == this.VersionCompareResult.SMALL)||(startContain == this.VersionCompareResult.SAME);
            var isEndContain = (endContain == this.VersionCompareResult.BIG)||(endContain == this.VersionCompareResult.SAME);

            if (isStartContain && isEndContain) {
                result = this.VersionContainResult.Contain;
            }
            else {
                result = this.VersionContainResult.Over;
            }

            return result;
        };
    }
);

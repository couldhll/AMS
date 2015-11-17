'use strict';

// Download service for download file
angular.module('core').service('Download', function () {
        // Download file
        this.downloadFile = function (fileName, content) {
            var aLink = document.createElement('a');
            var blob = new Blob([content]);
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.dispatchEvent(evt);
        };
    }
);

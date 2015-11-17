'use strict';

// Create Download Packages controller
angular.module('packages').controller('CreateDownloadPackagesController', ['$scope', '$stateParams', '$location', 'Authentication', '$state', 'Download', 'Packages', '$http', '$window',
  function ($scope, $stateParams, $location, Authentication, $state, Download, Packages, $http, $window) {
    $scope.authentication = Authentication;

    // Create all zip
    for(var i=0;i<$scope.packages.feature.selectPages.length;i++) {
      var page = $scope.packages.feature.selectPages[i];
      for (var j=0;j<page.zipFiles.length;j++) {
        var zipFile = page.zipFiles[j];

        var zipFileName = zipFile.name;
        var zipFileZip = zipFile.file;
        var zipFileTemplate = zipFile.template;

        // TODO: Merge all the feature
      }
      $scope.packages.zipFiles = page.zipFiles;
    }

    // Create config.plist
    var plistTemplateFilePath = "modules/packages/client/template/com.baidu.inputmethod.resource.config.plist";
    var plistFileName = "com.baidu.inputmethod.resource.config.plist";
    // 1. get plist template
    $http.get(plistTemplateFilePath)
        .success(function(response) {
          var plistTemplate = response;

          // template -> plist
          var data = $scope.packages.info;
          var plist = Packages.template(plistTemplate,data);

          // 2. put plist into zips
          for (var i=0;i<$scope.packages.zipFiles.length;i++) {
            var zipFile = page.zipFiles[i];

            var zipFileName = zipFile.name;
            var zipFileZip = zipFile.file;
            var zipFileTemplate = zipFile.template;

            zipFileZip.file(plistFileName, plist);
          }

          // 3. Add all.zip
          var zip = new $window.JSZip();
          for(var i=0;i<$scope.packages.zipFiles.length;i++) {
            var zipFile = $scope.packages.zipFiles[i];

            var zipFileName = zipFile.name;
            var zipFileZip = zipFile.file;

            var zipFileContent = zipFileZip.generate({type: "base64"});
            zip.file(zipFileName, zipFileContent, {base64: true});
          }
          $scope.packages.zipFiles.push({name: 'all.zip', file: zip, template: null});
        })
        .error(function(error) {
          alert(error);
        });

    // Download zip file
    $scope.download = function(zipFile) {
      var zipFileName = zipFile.name;
      var zipFileZip = zipFile.file;

      var content = zipFileZip.generate({type: "blob"});
      Download.downloadFile(zipFileName, content);
    };
  }
]);


'use strict';

// Create Download Packages controller
angular.module('packages').controller('CreateDownloadPackagesController', ['$scope', '$stateParams', '$location', 'Authentication', '$state', 'Download', '$http', '$window', 'Packages',
  function ($scope, $stateParams, $location, Authentication, $state, Download, $http, $window, Packages) {
    $scope.authentication = Authentication;

    // Merge all the feature
    var mergePackages = function(pages) {
      var page, zipFile, zip;
      var zipFileName, zipFileZip, zipFileTemplate, zipFileContent;
      var i, j, k;

      // 1. Get all version in each package & each feature
      var inputmethodVersions = [];
      for (i=0;i<pages.length;i++) {
        page = pages[i];

        for (j=0;j<page.zipFiles.length;j++) {
          zipFile = page.zipFiles[j];

          inputmethodVersions.push(zipFile.template.start);
          inputmethodVersions.push(zipFile.template.end);
        }
      }
      // 2. Unique & Sort
      var uniqueInputmethodVersions = [];
      window.$.each(inputmethodVersions, function(i, el){
        if(window.$.inArray(el, uniqueInputmethodVersions) === -1) uniqueInputmethodVersions.push(el);
      });
      // 3. Create version duration
      var inputmethodVersionDurations = [];
      for (i=0+1;i<uniqueInputmethodVersions.length;i++) {
        var version = uniqueInputmethodVersions[i];

        inputmethodVersionDurations.push({ start:uniqueInputmethodVersions[i-1], end:uniqueInputmethodVersions[i] });
      }
      // 4. For each duration, merge each feature zip
      var allzips = [];
      for (i=0;i<inputmethodVersionDurations.length;i++) {
        var versionDuration = inputmethodVersionDurations[i];

        var allZipFileZip = new $window.JSZip();
        var allZipFileName = versionDuration.start + "~" + versionDuration.end + "." + "zip";
        var allZipFileTemplate = versionDuration;

        for (j=0;j<pages.length;j++) {
          page = pages[j];

          for (k=0;k<page.zipFiles.length;k++) {
            zipFile = page.zipFiles[k];

            zipFileZip = zipFile.file;
            zipFileTemplate = zipFile.template;

            // Add the feature zip
            if (Packages.versionContain(zipFileTemplate,versionDuration)==Packages.VersionContainResult.Contain) {
              zipFileContent = zipFileZip.generate({type: "base64"});
              allZipFileZip.load(zipFileContent, {base64: true});
            }
          }
        }

        allzips.push({name: allZipFileName, file: allZipFileZip, template: allZipFileTemplate});
      }

      return allzips;
    };

    // Merge all the feature
    $scope.packages.zipFiles = mergePackages($scope.packages.feature.selectPages);

    // Create config.plist
    var plistTemplateFilePath = "modules/packages/client/template/com.baidu.inputmethod.resource.config.plist";
    var plistFileName = "com.baidu.inputmethod.resource.config.plist";
    // 1. get plist template
    $http.get(plistTemplateFilePath)
        .success(function(response) {
          var page, zipFile, zip;
          var zipFileName, zipFileZip, zipFileTemplate, zipFileContent;
          var i, j;
          var plistTemplate = response;

          // template -> plist
          var data = $scope.packages.info;
          var plist = $window.microtemplate(plistTemplate,data);

          // Feature
          for (i=0;i<$scope.packages.feature.selectPages.length;i++) {
            page = $scope.packages.feature.selectPages[i];

            // Feature:1. put plist into zips
            for (j=0;j<page.zipFiles.length;j++) {
              zipFile = page.zipFiles[j];

              zipFile.file.file(plistFileName, plist);
            }

            // Feature:2. Create all.zip
            zip = new $window.JSZip();
            for(j=0;j<page.zipFiles.length;j++) {
              zipFile = page.zipFiles[j];

              zipFileName = zipFile.name;
              zipFileZip = zipFile.file;

              zipFileContent = zipFileZip.generate({type: "base64"});
              zip.file(zipFileName, zipFileContent, {base64: true});
            }
            page.zipFiles.push({name: 'all.zip', file: zip, template: null});
          }

          // All:1. put plist into zips
          for (i=0;i<$scope.packages.zipFiles.length;i++) {
            zipFile = $scope.packages.zipFiles[i];

            zipFile.file.file(plistFileName, plist);
          }

          // All:2. Create all.zip
          zip = new $window.JSZip();
          for(i=0;i<$scope.packages.zipFiles.length;i++) {
            zipFile = $scope.packages.zipFiles[i];

            zipFileName = zipFile.name;
            zipFileZip = zipFile.file;

            zipFileContent = zipFileZip.generate({type: "base64"});
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


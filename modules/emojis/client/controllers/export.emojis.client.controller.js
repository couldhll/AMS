'use strict';

// Export Emoji controller
angular.module('emojis').controller('ExportEmojisController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emojis', 'EmojiGroups', 'Emoticons', 'EmoticonGroups', '$http', '$q', '$window', 'Download',
  function ($scope, $stateParams, $location, Authentication, Emojis, EmojiGroups, Emoticons, EmoticonGroups, $http, $q, $window, Download) {
    $scope.authentication = Authentication;

    // init
    var templatePath = "modules/emojis/client/template";

    // init export button
    $http.get(templatePath + "/" + "config.json")
        .success(function(response) {
          var templates = response;
          $scope.templates = templates;
        })
        .error(function(error) {
          alert(error);
        });

    // init emoji group grid
    $scope.emojiGroups = EmojiGroups.query();
    $scope.emojiGroupGridOptions = {
      // Sort
      enableSorting: false,
      // Select
      enableRowSelection: true,
      enableSelectAll: true,
      enableFullRowSelection: true,
      // Export
      exporterCsvFilename: 'myFile.csv',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "Emoji Group", style: 'headerStyle' },
      exporterPdfFooter: function ( currentPage, pageCount ) {
        return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
      },
      exporterPdfCustomFormatter: function ( docDefinition ) {
        docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
        docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
        return docDefinition;
      },
      exporterPdfOrientation: 'portrait',
      exporterPdfPageSize: 'LETTER',
      exporterPdfMaxGridWidth: 500,
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
      // Data
      enableGridMenu: true,
      columnDefs: [
        { field: '_id', enableCellEdit:false },
        { field: 'name' },
        { field: 'type' },
        { field: 'file' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'emojiGroups' };
    $scope.emojiGroupGridOptions.onRegisterApi = function (gridApi) {
      $scope.emojiGroupGridApi = gridApi;
    };

    // init emoticon group grid
    $scope.emoticonGroups = EmoticonGroups.query();
    $scope.emoticonGroupGridOptions = {
      // Sort
      enableSorting: false,
      // Select
      enableRowSelection: true,
      enableSelectAll: true,
      enableFullRowSelection: true,
      // Export
      exporterCsvFilename: 'myFile.csv',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "Emoji Group", style: 'headerStyle' },
      exporterPdfFooter: function ( currentPage, pageCount ) {
        return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
      },
      exporterPdfCustomFormatter: function ( docDefinition ) {
        docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
        docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
        return docDefinition;
      },
      exporterPdfOrientation: 'portrait',
      exporterPdfPageSize: 'LETTER',
      exporterPdfMaxGridWidth: 500,
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
      // Data
      enableGridMenu: true,
      columnDefs: [
        { field: '_id', enableCellEdit:false },
        { field: 'name' },
        { field: 'type' },
        { field: 'file' },
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'emoticonGroups' };
    $scope.emoticonGroupGridOptions.onRegisterApi = function (gridApi) {
      $scope.emoticonGroupGridApi = gridApi;
    };

    $scope.next = function() {
      $scope.exportAllPackage($scope.packages.info.version, $scope.templates)
          .then(function(zipFiles){
            // Put zip to packages
            $scope.packages.feature.nowPage.zipFiles = zipFiles;

            // Goto to next page
            $scope.packages.feature.GotoNextPage();
          });
    };

    $scope.exportAll = function() {
      $scope.exportAllPackage('Resource', $scope.templates)
          .then(function(zipFiles){
            // Create all zip
            var zip = new $window.JSZip();
            for(var i=0;i<zipFiles.length;i++) {
              var zipFile = zipFiles[i];

              var zipFileName = zipFile.name;
              var zipFileZip = zipFile.file;

              var zipFileContent = zipFileZip.generate({type: "base64"});
              zip.file(zipFileName, zipFileContent, {base64: true});
            }

            var content = zip.generate({type: "blob"});
            Download.downloadFile('all.zip', content);
          });
    };

    $scope.export = function(template) {
      $scope.exportPackage('Resource',template)
          .then(function(zipFile){
            var zipFileName = zipFile.name;
            var zipFileZip = zipFile.file;

            var content = zipFileZip.generate({type: "blob"});
            Download.downloadFile(zipFileName, content);
          });
    };

    $scope.exportAllPackage = function(resourceDirectory,templates) {
      // Create zips with templates
      var promises = [];
      for(var i=0;i<templates.length;i++)
      {
        var template=templates[i];
        var promise = $scope.exportPackage(resourceDirectory, template);
        promises.push(promise);
      }

      var deferred = $q.defer();

      // Return zips
      $q.all(promises)
          .then(function(zipFiles) {
            deferred.resolve(zipFiles);
          });

      return deferred.promise;
    };


    $scope.exportPackage = function(resourceDirectory,template) {
      // Config
      var plistTemplateFilePath = templatePath + "/" + template.plistInput;
      var iniFileName = template.iniOutput;
      var plistFileName = template.plistOutput;
      var zipFileName = template.start + "~" + template.end + "." + "zip";

      // Zip
      var zip = new $window.JSZip();
      var resourceFolder = zip.folder(resourceDirectory);

      // Create emoji group file
      var createEmojiGroupFile = function (group) {
        var groupId = group._id;
        var folderName = group.file;
        var seperate = group.seperate;

        var deferred = $q.defer();

        // 1. get emojis data
        Emojis.getFromGroup({
          emojiGroupId: groupId
        }, function (emojis)
        {
          // template -> ini
          var emojiTitles = emojis.map(function(emoji) {
            return emoji.title;
          });
          var ini = emojiTitles.join(seperate);

          // 2. put ini into zip
          var groupFolder = resourceFolder.folder(folderName);
          groupFolder.file(iniFileName, ini);

          // 3. put icon into zip
          $window.JSZipUtils.getBinaryContent(group.icon2xURL, function (err, data) {
            if(err) {
              throw err;
            }
            groupFolder.file(template.icon2xOutput, data, {binary:true});
          });
          $window.JSZipUtils.getBinaryContent(group.icon3xURL, function (err, data) {
            if(err) {
              throw err;
            }
            groupFolder.file(template.icon3xOutput, data, {binary:true});
          });

          // 4. edit group icon
          group.exportIcon = template.iconOutput;

          // 5. edit group file
          group.exportFile = resourceDirectory + '/' + folderName;

          deferred.resolve(ini);
        });

        return deferred.promise;
      };

      // Create emoticon group file
      var createEmoticonGroupFile = function (group) {
        var groupId = group._id;
        var folderName = group.file;
        var seperate = group.seperate;

        var deferred = $q.defer();

        // 1. get emoticons data
        Emoticons.getFromGroup({
          emoticonGroupId: groupId
        }, function (emoticons)
        {
          // template -> ini
          var emoticonTitles = emoticons.map(function(emoticon) {
            return emoticon.title;
          });
          var ini = emoticonTitles.join(seperate);

          // 2. put ini into zip
          var groupFolder = resourceFolder.folder(folderName);
          groupFolder.file(iniFileName, ini);

          // 3. edit group file
          group.exportFile = resourceDirectory + '/' + folderName;

          deferred.resolve(ini);
        });

        return deferred.promise;
      };

      var getEmoticonsWithGroup = function (group) {
        var groupId = group._id;

        var deferred = $q.defer();

        // get emoticons data
        Emoticons.getFromGroup({
          emoticonGroupId: groupId
        }, function (emoticons)
        {
          group.emoticons=emoticons;
          deferred.resolve(group);
        });

        return deferred.promise;
      };

      // Create all emoticon group file
      var createAllEmoticonGroupFile = function () {
        var group;

        var deferred = $q.defer();

        // 1. get groups [type=='face'], get out '最近'&'收藏'
        var groups = [];
        var rows = $scope.emoticonGroupGridApi.grid.rows;
        for (i = 0; i < rows.length; i++) {
          var row = rows[i];
          group = row.entity;
          if (group.type == 'face') {
            groups.push(group);
          }
        }

        // 2. get emoticons of each group
        var promises = [];
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          promise = getEmoticonsWithGroup(group);
          promises.push(promise);
        }

        // 3. Create plist
        $q.all(promises)
            .then(function(results) {
              // 1. get plist template
              $http.get(emoticonPlistTemplateFilePath)
                  .success(function (response) {
                    var plistTemplate = response;

                    // template -> plist
                    var data = {};
                    data.emoticonGroups = groups;

                    var plist = $window.microtemplate(plistTemplate, data);

                    // 2. put plist into zip
                    var groupFolder = resourceFolder.folder(emoticonFolderName);
                    groupFolder.file(emoticonPlistFileName, plist);

                    deferred.resolve(plist);
                  })
                  .error(function (error) {
                    alert(error);
                  });
            });



        return deferred.promise;
      };

      var promises = [];
      var rows, i, row, group, promise;
      // Get select emoji group
      rows = $scope.emojiGroupGridApi.grid.rows;
      for(i=0;i<rows.length;i++)
      {
        row=rows[i];
        if (row.isSelected===true)
        {
          group = row.entity;
          promise = createEmojiGroupFile(group);
          promises.push(promise);
        }
      }
      // Get select emoticon group
      if (template.start=='5.7') {// 5.7
        var emoticonPlistTemplateFilePath = templatePath + "/" + '5.7/info.plist';
        var emoticonPlistFileName = 'info.plist';
        var emoticonFolderName = 'face';

        promise = createAllEmoticonGroupFile();
        promises.push(promise);
      }
      else {// 6.0
        rows = $scope.emoticonGroupGridApi.grid.rows;
        for (i = 0; i < rows.length; i++) {
          row = rows[i];
          if (row.isSelected === true) {
            group = row.entity;
            promise = createEmoticonGroupFile(group);
            promises.push(promise);
          }
        }
      }

      var deferred = $q.defer();

      // Create plist
      $q.all(promises)
          .then(function(results) {
            // 1. get plist template
            $http.get(plistTemplateFilePath)
                .success(function(response) {
                  var plistTemplate = response;

                  // template -> plist
                  var data = {};
                  data.emojiGroups = $scope.emojiGroups;
                  data.emoticonGroups = $scope.emoticonGroups;
                  if (template.start=='5.7') {
                    data.emoticonFile = resourceDirectory + '/' + emoticonFolderName;
                  }

                  var plist = $window.microtemplate(plistTemplate,data);

                  // 2. put plist into zip
                  zip.file(plistFileName, plist);

                  deferred.resolve({name: zipFileName, file: zip, template: template});
                })
                .error(function(error) {
                  alert(error);
                });
      });

      return deferred.promise;
    };
  }
]);


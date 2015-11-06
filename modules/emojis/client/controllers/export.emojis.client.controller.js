'use strict';

/*jslint eqeq: true*/

// Export Emoji controller
angular.module('emojis').controller('ExportEmojisController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emojis', 'EmojiGroups', '$http', '$q', '$window',
  function ($scope, $stateParams, $location, Authentication, Emojis, EmojiGroups, $http, $q, $window) {
    $scope.authentication = Authentication;

    // init
    var templatePath = "modules/emojis/client/template";

    // init emoji group grid
    $scope.emojiGroups = EmojiGroups.query();

    // init export button
    $http.get(templatePath + "/" + "config.json")
        .success(function(response) {
          var templates = response;
          $scope.templates = templates;
        })
        .error(function(error) {
          alert(error);
        });

    // Config group grid
    $scope.groupGridOptions = {
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

    $scope.groupGridOptions.onRegisterApi = function (gridApi) {
      $scope.groupGridApi = gridApi;
    };

    $scope.export = function(template) {
      // config
      var packageVersion = '1.0';
      var plistTemplateFilePath = templatePath + "/" + template.plistInput;
      var iniFileName = template.iniOutput;
      var plistFileName = template.plistOutput;
      var zipFileName = template.start + "~" + template.end + "." + "zip";

      // zip
      var zip = new $window.JSZip();
      var versionFolder = zip.folder(packageVersion);

      // create group file
      var createGroupFile = function (group) {
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
          var groupFolder = versionFolder.folder(folderName);
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
          group.icon = template.iconOutput;

          // 5. edit group file
          group.file = packageVersion + '/' + folderName;

          deferred.resolve(ini);
        });

        return deferred.promise;
      };

      // get select emoji group
      var promises = [];
      var rows = $scope.groupGridApi.grid.rows;
      for(var i=0;i<rows.length;i++)
      {
        var row=rows[i];
        if (row.isSelected===true)
        {
          var group = row.entity;
          var promise = createGroupFile(group);
          promises.push(promise);
        }
      }

      // create plist
      $q.all(promises)
          .then(function(results) {
            // 1. get plist template
            $http.get(plistTemplateFilePath)
                .success(function(response) {
                  var plistTemplate = response;

                  // template -> plist
                  var data = {};
                  data.emojiGroups = $scope.emojiGroups;
                  var plist = $scope.tmpl(plistTemplate,data);

                  // 2. put plist into zip
                  zip.file(plistFileName, plist);

                  // last. download
                  var content = zip.generate({type:"blob"});
                  $scope.downloadFile(zipFileName, content);
                })
                .error(function(error) {
                  alert(error);
                });
      });
    };

    $scope.downloadFile = function (fileName, content) {
      var aLink = document.createElement('a');
      var blob = new Blob([content]);
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);
      aLink.dispatchEvent(evt);
    };

    $scope.tmpl = function tmpl(str, data){
      /*jslint evil: true */
      var fn =
          new Function("obj",
              "var p=[],print=function(){p.push.apply(p,arguments);};" +

                // Introduce the data as local variables using with(){}
              "with(obj){p.push('" +

                // Convert the template into pure JavaScript
              str
                  .replace(/[\r\t\n]/g, " ")// TODO: str no enter
                  .split("<%").join("\t")
                  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                  .replace(/\t=(.*?)%>/g, "',$1,'")
                  .split("\t").join("');")
                  .split("%>").join("p.push('")
                  .split("\r").join("\\'") +
              "');}return p.join('');");

      // Provide some basic currying to the user
      return data ? fn( data ) : fn;
    };
  }
]);


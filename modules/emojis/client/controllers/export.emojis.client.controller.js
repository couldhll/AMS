'use strict';

/*jslint eqeq: true*/

// Export Emoji controller
angular.module('emojis').controller('ExportEmojisController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emojis', 'EmojiGroups', '$http', '$q',
  function ($scope, $stateParams, $location, Authentication, Emojis, EmojiGroups, $http, $q) {
    $scope.authentication = Authentication;

    $scope.emojiGroups = EmojiGroups.query();

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
        { name: 'Created User', field: 'user.displayName', enableCellEdit:false },
        { name: 'Created Time', field: 'created', enableCellEdit:false }
      ],
      data: 'emojiGroups' };

    $scope.groupGridOptions.onRegisterApi = function (gridApi) {
      $scope.groupGridApi = gridApi;
    };

    $scope.export = function() {
      // zip
      var zip = new JSZip();
      var versionFolder = zip.folder('1.0');

      // create ini
      var createIni = function (groupId, groupName) {
        var deferred = $q.defer();

        // 1. get emojis data
        Emojis.getFromGroup({
          emojiGroupId: groupId
        }, function (emojis)
        {
          // 2. get ini template
          $http.get("modules/emojis/client/template/5.6-~/info.ini")
              .success(function(response) {
                var template = response;

                // template -> plist
                var data = new Object();
                data.emojis = emojis;
                var ini = $scope.tmpl(template,data);

                // 3. put ini into zip
                var groupFolder = versionFolder.folder(groupName);
                groupFolder.file('info.ini', ini);

                deferred.resolve(ini);
              })
              .error(function(error) {
                alert(error);
                deferred.reject(error);
              });
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
          var promise = createIni(group._id, group.name);
          promises.push(promise);
        }
      }

      // download zip
      $q.all(promises)
          .then(function(results) {
            // create plist
            $http.get("modules/emojis/client/template/5.6-~/com.baidu.inputmethod.emoji.plist")
                .success(function(response) {
                  var template = response;

                  // template -> plist
                  var data = new Object();
                  data.emojiGroups = $scope.emojiGroups;
                  var plist = $scope.tmpl(template,data);

                  // zip
                  zip.file('com.baidu.inputmethod.emoji.plist', plist);

                  // last. download
                  var content = zip.generate({type:"blob"});
                  $scope.downloadFile('example.zip', content);
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
      // Figure out if we're getting a template, or if we need to
      // load the template - and be sure to cache the result.
      var fn =
        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
          new Function("obj",
              "var p=[],print=function(){p.push.apply(p,arguments);};" +

                // Introduce the data as local variables using with(){}
              "with(obj){p.push('" +

                // Convert the template into pure JavaScript
              str
                  .replace(/[\r\t\n]/g, " ")
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


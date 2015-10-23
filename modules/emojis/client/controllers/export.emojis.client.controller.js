'use strict';

// Export Emoji controller
angular.module('emojis').controller('ExportEmojisController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emojis', 'EmojiGroups', '$http',
  function ($scope, $stateParams, $location, Authentication, Emojis, EmojiGroups, $http) {
    $scope.authentication = Authentication;

    $scope.emojiGroups = EmojiGroups.query();
    //$scope.emojis = Emojis.query();

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
      $http.get("modules/emojis/client/plist/com.baidu.inputmethod.emoji.plist")
          .success(function(response) {
            var template = response;
            var plist = $scope.tmpl(template,$scope);
            $scope.downloadFile('com.baidu.inputmethod.emoji.plist', plist);
          })
          .error(function(error) {
            alert(error);
          });

      var html = document.getElementById('user_tmpl').innerHTML;
      console.log($scope.tmpl(html,$scope));
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
                  .split("\r").join("\\'")
              + "');}return p.join('');");

      // Provide some basic currying to the user
      return data ? fn( data ) : fn;
    };
  }
]);


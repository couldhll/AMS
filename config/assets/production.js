'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.min.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
        'public/lib/angular-ui-grid/ui-grid.min.css'
      ],
      js: [
        'public/lib/angular/angular.min.js',
        'public/lib/angular-resource/angular-resource.min.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/angular-messages/angular-messages.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        'public/lib/angular-ui-utils/ui-utils.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/lib/angular-file-upload/angular-file-upload.min.js',
        'public/lib/angular-ui-grid/ui-grid.min.js',
        'public/lib/ui-grid-draggable-rows/js/draggable-rows.js',
        'public/lib/pdfmake/build/pdfmake.min.js',
        'public/lib/pdfmake/build/vfs_fonts.js',
        'public/lib/jszip/dist/jszip.min.js',
        'public/lib/jszip-utils/dist/jszip-utils.min.js',
        'public/lib/jquery/dist/jquery.min.js'
      ]
    },
    css: 'public/dist/application.min.css',
    js: 'public/dist/application.min.js'
  }
};

'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-ui-grid/ui-grid.css',
        'public/lib/angular-bootstrap-datetimepicker/src/css/datetimepicker.css'
      ],
      js: [
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/angular-ui-grid/ui-grid.js',
        'public/lib/ui-grid-draggable-rows/js/draggable-rows.js',
        'public/lib/pdfmake/build/pdfmake.js',
        'public/lib/pdfmake/build/vfs_fonts.js',
        'public/lib/CSV-JS/csv.js',
        'public/lib/jszip/dist/jszip.js',
        'public/lib/jszip-utils/dist/jszip-utils.js',
        'public/lib/jquery/dist/jquery.js',
        'public/lib/moment/moment.js',
        'public/lib/bootstrap/dist/js/bootstrap.js',
        'public/lib/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
        'public/lib/checklist-model/checklist-model.js',
        'public/lib/microtemplates/index.js',
        'public/lib/angular-translate/angular-translate.js',
        'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
        'public/lib/angular-cookies/angular-cookies.js',
        'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
        'public/lib/angular-translate-storage-local/angular-translate-storage-local.js',
        'public/lib/SparkMD5/spark-md5.js'
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};

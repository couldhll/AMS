'use strict';

// image uploader for ui-grid
angular.module('core').service('ScriptUploader', ['FileUploader', '$window', '$timeout',
  function (FileUploader, $window, $timeout) {
    // Create file uploader instance
    this.uploader = new FileUploader();

    // Set file uploader picture filter
    this.uploader.filters.push({
      name: 'scriptFilter',
      fn: function (item, options) {
        var type;
        if (item.type=="") {
          type = item.name.slice(item.name.lastIndexOf('.') + 1);
        }
        else {
          type = item.type.slice(item.type.lastIndexOf('/') + 1);
        }
        type = '|' + type + '|';

        var result ='|lua|'.indexOf(type) !== -1;
        if (!result) {
          alert('Please choose lua script');
        }
        return result; // Only png
      }
    });

    // Called after the user selected a new picture file
    this.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            //this.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    this.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      //// Show success message
      //this.success = true

      // Upload Complete
      this.$emit('onComplete', response);

      // Clear upload buttons
      this.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    this.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      this.cancelUpload();

      // Upload Error
      this.$emit('onError', response);

      //// Show error message
      //this.error = response.message;
    };

    // Change picture
    this.uploadPicture = function () {
      //// Clear messages
      //this.success = this.error = null;

      // Start upload
      this.uploader.uploadAll();
    };
  }
]);

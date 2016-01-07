'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Customkey = mongoose.model('Customkey'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

/**
 * Create a customkey
 */
exports.create = function (req, res) {
  var customkey = new Customkey(req.body);
  customkey.user = req.user;
  customkey.index = req.body.index;

  customkey.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(customkey);
    }
  });
};

/**
 * Show the current customkey
 */
exports.read = function (req, res) {
  res.json(req.customkey);
};

/**
 * Update a customkey
 */
exports.update = function (req, res) {
  var customkey = req.customkey;

  customkey.name = req.body.name;
  customkey.settingImageFile = req.body.settingImageFile;
  customkey.keyboardImageFile = req.body.keyboardImageFile;
  customkey.index = req.body.index;

  customkey.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(customkey);
    }
  });
};

/**
 * Delete an customkey
 */
exports.delete = function (req, res) {
  var customkey = req.customkey;

  customkey.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(customkey);
    }
  });
};

/**
 * List of Customkeys
 */
exports.list = function (req, res) {
  Customkey.find().sort('index').populate('user', 'displayName').exec(function (err, customkeys) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(customkeys);
    }
  });
};

/**
 * Update 2x setting image
 */
exports.changeSettingImage2x = function (req, res) {
  var customkey = req.customkey;
  var message = null;

  if (customkey) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading image'
        });
      } else {
        customkey.settingImage2xURL = 'uploads/' + req.files.file.name;

        customkey.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(customkey);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Customkey is invalid'
    });
  }
};

/**
 * Update 2x keyboard image
 */
exports.changeKeyboardImage2x = function (req, res) {
  var customkey = req.customkey;
  var message = null;

  if (customkey) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading image'
        });
      } else {
        customkey.keyboardImage2xURL = 'uploads/' + req.files.file.name;

        customkey.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(customkey);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Customkey is invalid'
    });
  }
};

/**
 * Customkey middleware
 */
exports.customkeyByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Customkey is invalid'
    });
  }

  Customkey.findById(id).populate('user', 'displayName').exec(function (err, customkey) {
    if (err) {
      return next(err);
    } else if (!customkey) {
      return res.status(404).send({
        message: 'No customkey with that identifier has been found'
      });
    }
    req.customkey = customkey;
    next();
  });
};

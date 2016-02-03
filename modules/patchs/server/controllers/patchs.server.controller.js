'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Patch = mongoose.model('Patch'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

/**
 * Create a patch
 */
exports.create = function (req, res) {
  var patch = new Patch(req.body);
  patch.user = req.user;
  patch.index = req.body.index;

  patch.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patch);
    }
  });
};

/**
 * Show the current patch
 */
exports.read = function (req, res) {
  res.json(req.patch);
};

/**
 * Update a patch
 */
exports.update = function (req, res) {
  var patch = req.patch;

  patch.name = req.body.name;
  patch.mode = req.body.mode;
  patch.script = req.body.script;
  patch.host = req.body.host;
  patch.encrypt = req.body.encrypt;
  patch.index = req.body.index;

  patch.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patch);
    }
  });
};

/**
 * Delete an patch
 */
exports.delete = function (req, res) {
  var patch = req.patch;

  patch.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patch);
    }
  });
};

/**
 * List of Patchs
 */
exports.list = function (req, res) {
  Patch.find().sort('index').populate('user', 'displayName').exec(function (err, patchs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patchs);
    }
  });
};

/**
 * Update 1x script file
 */
exports.changeScriptFile = function (req, res) {
  var patch = req.patch;
  var message = null;

  if (patch) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading script file'
        });
      } else {
        patch.scriptFile = 'uploads/' + req.files.file.name;

        patch.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(patch);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Patch is invalid'
    });
  }
};

/**
 * Patch middleware
 */
exports.patchByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Patch is invalid'
    });
  }

  Patch.findById(id).populate('user', 'displayName').exec(function (err, patch) {
    if (err) {
      return next(err);
    } else if (!patch) {
      return res.status(404).send({
        message: 'No patch with that identifier has been found'
      });
    }
    req.patch = patch;
    next();
  });
};

'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Discoverycenterbanner = mongoose.model('Discoverycenterbanner'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

/**
 * Create a discoverycenterbanner
 */
exports.create = function (req, res) {
  var discoverycenterbanner = new Discoverycenterbanner(req.body);
  discoverycenterbanner.user = req.user;
  discoverycenterbanner.index = req.body.index;

  discoverycenterbanner.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discoverycenterbanner);
    }
  });
};

/**
 * Show the current discoverycenterbanner
 */
exports.read = function (req, res) {
  res.json(req.discoverycenterbanner);
};

/**
 * Update a discoverycenterbanner
 */
exports.update = function (req, res) {
  var discoverycenterbanner = req.discoverycenterbanner;

  discoverycenterbanner.name = req.body.name;
  discoverycenterbanner.openUrl = req.body.openUrl;
  discoverycenterbanner.bannerImageFile = req.body.bannerImageFile;
  discoverycenterbanner.index = req.body.index;

  discoverycenterbanner.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discoverycenterbanner);
    }
  });
};

/**
 * Delete an discoverycenterbanner
 */
exports.delete = function (req, res) {
  var discoverycenterbanner = req.discoverycenterbanner;

  discoverycenterbanner.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discoverycenterbanner);
    }
  });
};

/**
 * List of Discoverycenterbanners
 */
exports.list = function (req, res) {
  Discoverycenterbanner.find().sort('index').populate('user', 'displayName').exec(function (err, discoverycenterbanners) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discoverycenterbanners);
    }
  });
};

/**
 * Update 1x banner image
 */
exports.changeBannerImage1x = function (req, res) {
  var discoverycenterbanner = req.discoverycenterbanner;
  var message = null;

  if (discoverycenterbanner) {
    fs.writeFile('./modules/discoverycenterbanners/client/img/image/uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading image'
        });
      } else {
        discoverycenterbanner.bannerImage1xURL = 'modules/discoverycenterbanners/client/img/image/uploads/' + req.files.file.name;

        discoverycenterbanner.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(discoverycenterbanner);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Discoverycenterbanner is invalid'
    });
  }
};

/**
 * Discoverycenterbanner middleware
 */
exports.discoverycenterbannerByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Discoverycenterbanner is invalid'
    });
  }

  Discoverycenterbanner.findById(id).populate('user', 'displayName').exec(function (err, discoverycenterbanner) {
    if (err) {
      return next(err);
    } else if (!discoverycenterbanner) {
      return res.status(404).send({
        message: 'No discoverycenterbanner with that identifier has been found'
      });
    }
    req.discoverycenterbanner = discoverycenterbanner;
    next();
  });
};

'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Spotlight = mongoose.model('Spotlight'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a spotlight
 */
exports.create = function (req, res) {
  var spotlight = new Spotlight(req.body);
  spotlight.user = req.user;
  spotlight.index = req.body.index;

  spotlight.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(spotlight);
    }
  });
};

/**
 * Show the current spotlight
 */
exports.read = function (req, res) {
  res.json(req.spotlight);
};

/**
 * Update a spotlight
 */
exports.update = function (req, res) {
  var spotlight = req.spotlight;

  spotlight.title = req.body.title;
  spotlight.content = req.body.content;
  spotlight.url = req.body.url;
  spotlight.index = req.body.index;

  spotlight.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(spotlight);
    }
  });
};

/**
 * Delete an spotlight
 */
exports.delete = function (req, res) {
  var spotlight = req.spotlight;

  spotlight.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(spotlight);
    }
  });
};

/**
 * List of Spotlights
 */
exports.list = function (req, res) {
  Spotlight.find().sort('index').populate('user', 'displayName').exec(function (err, spotlights) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(spotlights);
    }
  });
};

/**
 * Spotlight middleware
 */
exports.spotlightByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Spotlight is invalid'
    });
  }

  Spotlight.findById(id).populate('user', 'displayName').exec(function (err, spotlight) {
    if (err) {
      return next(err);
    } else if (!spotlight) {
      return res.status(404).send({
        message: 'No spotlight with that identifier has been found'
      });
    }
    req.spotlight = spotlight;
    next();
  });
};

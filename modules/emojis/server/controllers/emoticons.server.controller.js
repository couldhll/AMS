'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Emoticon = mongoose.model('Emoticon'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a emoticon
 */
exports.create = function (req, res) {
  var emoticon = new Emoticon(req.body);
  emoticon.user = req.user;
  emoticon.index = req.body.index;
  emoticon.group = req.body.group;

  emoticon.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emoticon);
    }
  });
};

/**
 * Show the current emoticon
 */
exports.read = function (req, res) {
  res.json(req.emoticon);
};

/**
 * Update a emoticon
 */
exports.update = function (req, res) {
  var emoticon = req.emoticon;

  emoticon.title = req.body.title;
  emoticon.index = req.body.index;
  emoticon.group = req.body.group;

  emoticon.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emoticon);
    }
  });
};

/**
 * Delete an emoticon
 */
exports.delete = function (req, res) {
  var emoticon = req.emoticon;

  emoticon.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emoticon);
    }
  });
};

/**
 * List of Emoticons
 */
exports.list = function (req, res) {
  Emoticon.find().sort('index').populate('user', 'displayName').populate('group', 'name').exec(function (err, emoticons) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emoticons);
    }
  });
};

/**
 * Emoticon middleware
 */
exports.emoticonByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Emoticon is invalid'
    });
  }

  Emoticon.findById(id).populate('user', 'displayName').populate('group', 'name').exec(function (err, emoticon) {
    if (err) {
      return next(err);
    } else if (!emoticon) {
      return res.status(404).send({
        message: 'No emoticon with that identifier has been found'
      });
    }
    req.emoticon = emoticon;
    next();
  });
};

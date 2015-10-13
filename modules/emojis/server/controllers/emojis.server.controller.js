'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Emoji = mongoose.model('Emoji'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a emoji
 */
exports.create = function (req, res) {
  var emoji = new Emoji(req.body);
  emoji.user = req.user;
  emoji.group = req.group;

  emoji.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emoji);
    }
  });
};

/**
 * Show the current emoji
 */
exports.read = function (req, res) {
  res.json(req.emoji);
};

/**
 * Update a emoji
 */
exports.update = function (req, res) {
  var emoji = req.emoji;

  emoji.title = req.body.title;

  emoji.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emoji);
    }
  });
};

/**
 * Delete an emoji
 */
exports.delete = function (req, res) {
  var emoji = req.emoji;

  emoji.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emoji);
    }
  });
};

/**
 * List of Emojis
 */
exports.list = function (req, res) {
  Emoji.find().sort('-created').populate('user', 'displayName').exec(function (err, emojis) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emojis);
    }
  });
};

/**
 * Emoji middleware
 */
exports.emojiByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Emoji is invalid'
    });
  }

  Emoji.findById(id).populate('user', 'displayName').exec(function (err, emoji) {
    if (err) {
      return next(err);
    } else if (!emoji) {
      return res.status(404).send({
        message: 'No emoji with that identifier has been found'
      });
    }
    req.emoji = emoji;
    next();
  });
};

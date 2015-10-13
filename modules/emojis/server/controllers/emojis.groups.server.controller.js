'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    EmojiGroup = mongoose.model('EmojiGroup'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a emoji group
 */
exports.create = function (req, res) {
  var emojiGroup = new EmojiGroup(req.body);
  emojiGroup.user = req.user;
  emojiGroup.emojis = req.emojis;

  emojiGroup.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emojiGroup);
    }
  });
};

/**
 * Show the current emoji group
 */
exports.read = function (req, res) {
  res.json(req.emojiGroup);
};

/**
 * Update a emoji group
 */
exports.update = function (req, res) {
  var emojiGroup = req.emojiGroup;

  emojiGroup.name = req.body.name;

  emojiGroup.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emojiGroup);
    }
  });
};

/**
 * Delete an emoji group
 */
exports.delete = function (req, res) {
  var emojiGroup = req.emojiGroup;

  emojiGroup.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emojiGroup);
    }
  });
};

/**
 * List of Emoji Groups
 */
exports.list = function (req, res) {
  EmojiGroup.find().sort('-created').populate('user', 'displayName').exec(function (err, emojiGroups) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emojiGroups);
    }
  });
};

/**
 * Emoji Group middleware
 */
exports.emojiGroupByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Emoji Group is invalid'
    });
  }

  EmojiGroup.findById(id).populate('user', 'displayName').exec(function (err, emojiGroup) {
    if (err) {
      return next(err);
    } else if (!emojiGroup) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.emojiGroup = emojiGroup;
    next();
  });
};

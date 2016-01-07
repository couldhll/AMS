'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    EmojiGroup = mongoose.model('EmojiGroup'),
    Emoji = mongoose.model('Emoji'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

/**
 * Create a emoji group
 */
exports.create = function (req, res) {
  var emojiGroup = new EmojiGroup(req.body);
  emojiGroup.user = req.user;

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
  emojiGroup.type = req.body.type;
  emojiGroup.file = req.body.file;
  emojiGroup.seperate = req.body.seperate;
  emojiGroup.index = req.body.index;

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
  EmojiGroup.find().sort('index').populate('user', 'displayName').exec(function (err, emojiGroups) {
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
 * List of Emojis
 */
exports.emojis = function (req, res) {
  var id = req.emojiGroup._id;

  Emoji.find({ group: id }).sort('index').populate('user', 'displayName').populate('group', 'name').exec(function (err, emojis) {
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
 * Update 2x icon
 */
exports.changeIcon2x = function (req, res) {
  var emojiGroup = req.emojiGroup;
  var message = null;

  if (emojiGroup) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        emojiGroup.icon2xURL = 'uploads/' + req.files.file.name;

        emojiGroup.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(emojiGroup);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Emoji Group is invalid'
    });
  }
};

/**
 * Update 3x icon
 */
exports.changeIcon3x = function (req, res) {
  var emojiGroup = req.emojiGroup;
  var message = null;

  if (emojiGroup) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        emojiGroup.icon3xURL = 'uploads/' + req.files.file.name;

        emojiGroup.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(emojiGroup);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Emoji Group is invalid'
    });
  }
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
        message: 'No emoji group with that identifier has been found'
      });
    }
    req.emojiGroup = emojiGroup;
    next();
  });
};

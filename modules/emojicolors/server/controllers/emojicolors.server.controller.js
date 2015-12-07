'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Emojicolor = mongoose.model('Emojicolor'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a emojicolor
 */
exports.create = function (req, res) {
  var emojicolor = new Emojicolor(req.body);
  emojicolor.user = req.user;
  emojicolor.index = req.body.index;

  emojicolor.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emojicolor);
    }
  });
};

/**
 * Show the current emojicolor
 */
exports.read = function (req, res) {
  res.json(req.emojicolor);
};

/**
 * Update a emojicolor
 */
exports.update = function (req, res) {
  var emojicolor = req.emojicolor;

  emojicolor.title = req.body.title;
  emojicolor.color = req.body.color;
  emojicolor.index = req.body.index;

  emojicolor.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emojicolor);
    }
  });
};

/**
 * Delete an emojicolor
 */
exports.delete = function (req, res) {
  var emojicolor = req.emojicolor;

  emojicolor.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emojicolor);
    }
  });
};

/**
 * List of Emojicolors
 */
exports.list = function (req, res) {
  Emojicolor.find().sort('index').populate('user', 'displayName').exec(function (err, emojicolors) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emojicolors);
    }
  });
};

/**
 * Emojicolor middleware
 */
exports.emojicolorByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Emojicolor is invalid'
    });
  }

  Emojicolor.findById(id).populate('user', 'displayName').exec(function (err, emojicolor) {
    if (err) {
      return next(err);
    } else if (!emojicolor) {
      return res.status(404).send({
        message: 'No emojicolor with that identifier has been found'
      });
    }
    req.emojicolor = emojicolor;
    next();
  });
};

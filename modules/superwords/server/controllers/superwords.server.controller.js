'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Superword = mongoose.model('Superword'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a superword
 */
exports.create = function (req, res) {
  var superword = new Superword(req.body);
  superword.user = req.user;
  superword.index = req.body.index;
  superword.group = req.body.group;

  superword.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(superword);
    }
  });
};

/**
 * Show the current superword
 */
exports.read = function (req, res) {
  res.json(req.superword);
};

/**
 * Update a superword
 */
exports.update = function (req, res) {
  var superword = req.superword;

  superword.pattern = req.body.pattern;
  superword.title = req.body.title;
  superword.head = req.body.head;
  superword.tail = req.body.tail;
  superword.index = req.body.index;
  superword.group = req.body.group;

  superword.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(superword);
    }
  });
};

/**
 * Delete an superword
 */
exports.delete = function (req, res) {
  var superword = req.superword;

  superword.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(superword);
    }
  });
};

/**
 * List of Superwords
 */
exports.list = function (req, res) {
  Superword.find().sort('index').populate('user', 'displayName').populate('group', 'title').exec(function (err, superwords) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(superwords);
    }
  });
};

/**
 * Superword middleware
 */
exports.superwordByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Superword is invalid'
    });
  }

  Superword.findById(id).populate('user', 'displayName').populate('group', 'title').exec(function (err, superword) {
    if (err) {
      return next(err);
    } else if (!superword) {
      return res.status(404).send({
        message: 'No superword with that identifier has been found'
      });
    }
    req.superword = superword;
    next();
  });
};

'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    SuperwordGroup = mongoose.model('SuperwordGroup'),
    Superword = mongoose.model('Superword'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

/**
 * Create a superword group
 */
exports.create = function (req, res) {
  var superwordGroup = new SuperwordGroup(req.body);
  superwordGroup.user = req.user;

  superwordGroup.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(superwordGroup);
    }
  });
};

/**
 * Show the current superword group
 */
exports.read = function (req, res) {
  res.json(req.superwordGroup);
};

/**
 * Update a superword group
 */
exports.update = function (req, res) {
  var superwordGroup = req.superwordGroup;

  superwordGroup.title = req.body.title;
  superwordGroup.index = req.body.index;

  superwordGroup.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(superwordGroup);
    }
  });
};

/**
 * Delete an superword group
 */
exports.delete = function (req, res) {
  var superwordGroup = req.superwordGroup;

  superwordGroup.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(superwordGroup);
    }
  });
};

/**
 * List of Superword Groups
 */
exports.list = function (req, res) {
  SuperwordGroup.find().sort('index').populate('user', 'displayName').exec(function (err, superwordGroups) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(superwordGroups);
    }
  });
};

/**
 * List of Superwords
 */
exports.superwords = function (req, res) {
  var id = req.superwordGroup._id;

  Superword.find({ group: id }).sort('index').populate('user', 'displayName').populate('group', 'title').exec(function (err, superwords) {
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
 * Superword Group middleware
 */
exports.superwordGroupByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Superword Group is invalid'
    });
  }

  SuperwordGroup.findById(id).populate('user', 'displayName').exec(function (err, superwordGroup) {
    if (err) {
      return next(err);
    } else if (!superwordGroup) {
      return res.status(404).send({
        message: 'No superword group with that identifier has been found'
      });
    }
    req.superwordGroup = superwordGroup;
    next();
  });
};

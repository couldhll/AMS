'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    EmoticonGroup = mongoose.model('EmoticonGroup'),
    Emoticon = mongoose.model('Emoticon'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

/**
 * Create a emoticon group
 */
exports.create = function (req, res) {
  var emoticonGroup = new EmoticonGroup(req.body);
  emoticonGroup.user = req.user;

  emoticonGroup.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emoticonGroup);
    }
  });
};

/**
 * Show the current emoticon group
 */
exports.read = function (req, res) {
  res.json(req.emoticonGroup);
};

/**
 * Update a emoticon group
 */
exports.update = function (req, res) {
  var emoticonGroup = req.emoticonGroup;

  emoticonGroup.name = req.body.name;
  emoticonGroup.type = req.body.type;
  emoticonGroup.file = req.body.file;
  emoticonGroup.seperate = req.body.seperate;
  emoticonGroup.index = req.body.index;

  emoticonGroup.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emoticonGroup);
    }
  });
};

/**
 * Delete an emoticon group
 */
exports.delete = function (req, res) {
  var emoticonGroup = req.emoticonGroup;

  emoticonGroup.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emoticonGroup);
    }
  });
};

/**
 * List of Emoticon Groups
 */
exports.list = function (req, res) {
  EmoticonGroup.find().sort('index').populate('user', 'displayName').exec(function (err, emoticonGroups) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(emoticonGroups);
    }
  });
};

/**
 * List of Emoticons
 */
exports.emoticons = function (req, res) {
  var id = req.emoticonGroup._id;

  Emoticon.find({ group: id }).sort('index').populate('user', 'displayName').populate('group', 'name').exec(function (err, emoticons) {
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
 * Emoticon Group middleware
 */
exports.emoticonGroupByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Emoticon Group is invalid'
    });
  }

  EmoticonGroup.findById(id).populate('user', 'displayName').exec(function (err, emoticonGroup) {
    if (err) {
      return next(err);
    } else if (!emoticonGroup) {
      return res.status(404).send({
        message: 'No emoticon group with that identifier has been found'
      });
    }
    req.emoticonGroup = emoticonGroup;
    next();
  });
};

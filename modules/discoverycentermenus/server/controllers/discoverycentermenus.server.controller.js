'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Discoverycentermenu = mongoose.model('Discoverycentermenu'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

/**
 * Create a discoverycentermenu
 */
exports.create = function (req, res) {
  var discoverycentermenu = new Discoverycentermenu(req.body);
  discoverycentermenu.user = req.user;
  discoverycentermenu.index = req.body.index;

  discoverycentermenu.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discoverycentermenu);
    }
  });
};

/**
 * Show the current discoverycentermenu
 */
exports.read = function (req, res) {
  res.json(req.discoverycentermenu);
};

/**
 * Update a discoverycentermenu
 */
exports.update = function (req, res) {
  var discoverycentermenu = req.discoverycentermenu;

  discoverycentermenu.name = req.body.name;
  discoverycentermenu.title = req.body.title;
  discoverycentermenu.detail = req.body.detail;
  discoverycentermenu.iconFile = req.body.iconFile;
  discoverycentermenu.index = req.body.index;

  discoverycentermenu.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discoverycentermenu);
    }
  });
};

/**
 * Delete an discoverycentermenu
 */
exports.delete = function (req, res) {
  var discoverycentermenu = req.discoverycentermenu;

  discoverycentermenu.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discoverycentermenu);
    }
  });
};

/**
 * List of Discoverycentermenus
 */
exports.list = function (req, res) {
  Discoverycentermenu.find().sort('index').populate('user', 'displayName').exec(function (err, discoverycentermenus) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discoverycentermenus);
    }
  });
};

/**
* Update 1x icon
*/
exports.changeIcon1x = function (req, res) {
  var discoverycentermenu = req.discoverycentermenu;
  var message = null;

  if (discoverycentermenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        discoverycentermenu.icon1xURL = 'uploads/' + req.files.file.name;

        discoverycentermenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(discoverycentermenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Discoverycentermenu is invalid'
    });
  }
};

/**
* Update 2x icon
*/
exports.changeIcon2x = function (req, res) {
  var discoverycentermenu = req.discoverycentermenu;
  var message = null;

  if (discoverycentermenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        discoverycentermenu.icon2xURL = 'uploads/' + req.files.file.name;

        discoverycentermenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(discoverycentermenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Discoverycentermenu is invalid'
    });
  }
};

/**
* Update 3x icon
*/
exports.changeIcon3x = function (req, res) {
  var discoverycentermenu = req.discoverycentermenu;
  var message = null;

  if (discoverycentermenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        discoverycentermenu.icon3xURL = 'uploads/' + req.files.file.name;

        discoverycentermenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(discoverycentermenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Discoverycentermenu is invalid'
    });
  }
};

/**
 * Discoverycentermenu middleware
 */
exports.discoverycentermenuByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Discoverycentermenu is invalid'
    });
  }

  Discoverycentermenu.findById(id).populate('user', 'displayName').exec(function (err, discoverycentermenu) {
    if (err) {
      return next(err);
    } else if (!discoverycentermenu) {
      return res.status(404).send({
        message: 'No discoverycentermenu with that identifier has been found'
      });
    }
    req.discoverycentermenu = discoverycentermenu;
    next();
  });
};

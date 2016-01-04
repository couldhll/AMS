'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Settingmenu = mongoose.model('Settingmenu'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

/**
 * Create a settingmenu
 */
exports.create = function (req, res) {
  var settingmenu = new Settingmenu(req.body);
  settingmenu.user = req.user;
  settingmenu.index = req.body.index;

  settingmenu.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(settingmenu);
    }
  });
};

/**
 * Show the current settingmenu
 */
exports.read = function (req, res) {
  res.json(req.settingmenu);
};

/**
 * Update a settingmenu
 */
exports.update = function (req, res) {
  var settingmenu = req.settingmenu;

  settingmenu.name = req.body.name;
  settingmenu.selectName = req.body.selectName;
  settingmenu.iconFile = req.body.iconFile;
  settingmenu.selectIconFile = req.body.selectIconFile;
  settingmenu.index = req.body.index;

  settingmenu.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(settingmenu);
    }
  });
};

/**
 * Delete an settingmenu
 */
exports.delete = function (req, res) {
  var settingmenu = req.settingmenu;

  settingmenu.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(settingmenu);
    }
  });
};

/**
 * List of Settingmenus
 */
exports.list = function (req, res) {
  Settingmenu.find().sort('index').populate('user', 'displayName').exec(function (err, settingmenus) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(settingmenus);
    }
  });
};

/**
* Update 1x icon
*/
exports.changeIcon1x = function (req, res) {
  var settingmenu = req.settingmenu;
  var message = null;

  if (settingmenu) {
    fs.writeFile('./modules/settingmenus/client/img/image/uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        settingmenu.icon1xURL = 'modules/settingmenus/client/img/image/uploads/' + req.files.file.name;

        settingmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(settingmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Settingmenu is invalid'
    });
  }
};

/**
* Update 2x icon
*/
exports.changeIcon2x = function (req, res) {
  var settingmenu = req.settingmenu;
  var message = null;

  if (settingmenu) {
    fs.writeFile('./modules/settingmenus/client/img/image/uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        settingmenu.icon2xURL = 'modules/settingmenus/client/img/image/uploads/' + req.files.file.name;

        settingmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(settingmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Settingmenu is invalid'
    });
  }
};

/**
* Update 3x icon
*/
exports.changeIcon3x = function (req, res) {
  var settingmenu = req.settingmenu;
  var message = null;

  if (settingmenu) {
    fs.writeFile('./modules/settingmenus/client/img/image/uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        settingmenu.icon3xURL = 'modules/settingmenus/client/img/image/uploads/' + req.files.file.name;

        settingmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(settingmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Settingmenu is invalid'
    });
  }
};

/**
 * Update 1x select icon
 */
exports.changeSelectIcon1x = function (req, res) {
  var settingmenu = req.settingmenu;
  var message = null;

  if (settingmenu) {
    fs.writeFile('./modules/settingmenus/client/img/image/uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        settingmenu.selectIcon1xURL = 'modules/settingmenus/client/img/image/uploads/' + req.files.file.name;

        settingmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(settingmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Settingmenu is invalid'
    });
  }
};

/**
 * Update 2x select icon
 */
exports.changeSelectIcon2x = function (req, res) {
  var settingmenu = req.settingmenu;
  var message = null;

  if (settingmenu) {
    fs.writeFile('./modules/settingmenus/client/img/image/uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        settingmenu.selectIcon2xURL = 'modules/settingmenus/client/img/image/uploads/' + req.files.file.name;

        settingmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(settingmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Settingmenu is invalid'
    });
  }
};

/**
 * Update 3x select icon
 */
exports.changeSelectIcon3x = function (req, res) {
  var settingmenu = req.settingmenu;
  var message = null;

  if (settingmenu) {
    fs.writeFile('./modules/settingmenus/client/img/image/uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        settingmenu.selectIcon3xURL = 'modules/settingmenus/client/img/image/uploads/' + req.files.file.name;

        settingmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(settingmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Settingmenu is invalid'
    });
  }
};

/**
 * Settingmenu middleware
 */
exports.settingmenuByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Settingmenu is invalid'
    });
  }

  Settingmenu.findById(id).populate('user', 'displayName').exec(function (err, settingmenu) {
    if (err) {
      return next(err);
    } else if (!settingmenu) {
      return res.status(404).send({
        message: 'No settingmenu with that identifier has been found'
      });
    }
    req.settingmenu = settingmenu;
    next();
  });
};

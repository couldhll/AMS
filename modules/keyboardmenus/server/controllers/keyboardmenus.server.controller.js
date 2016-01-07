'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Keyboardmenu = mongoose.model('Keyboardmenu'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

/**
 * Create a keyboardmenu
 */
exports.create = function (req, res) {
  var keyboardmenu = new Keyboardmenu(req.body);
  keyboardmenu.user = req.user;
  keyboardmenu.index = req.body.index;

  keyboardmenu.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(keyboardmenu);
    }
  });
};

/**
 * Show the current keyboardmenu
 */
exports.read = function (req, res) {
  res.json(req.keyboardmenu);
};

/**
 * Update a keyboardmenu
 */
exports.update = function (req, res) {
  var keyboardmenu = req.keyboardmenu;

  keyboardmenu.type = req.body.type;
  keyboardmenu.position = req.body.position;
  keyboardmenu.name = req.body.name;
  keyboardmenu.title = req.body.title;
  keyboardmenu.selectTitle = req.body.selectTitle;
  keyboardmenu.iconFile = req.body.iconFile;
  keyboardmenu.selectIconFile = req.body.selectIconFile;
  keyboardmenu.highlightIconFile = req.body.highlightIconFile;
  keyboardmenu.iconThemeFile = req.body.iconThemeFile;
  keyboardmenu.selectIconThemeFile = req.body.selectIconThemeFile;
  keyboardmenu.highlightIconThemeFile = req.body.highlightIconThemeFile;
  keyboardmenu.index = req.body.index;

  keyboardmenu.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(keyboardmenu);
    }
  });
};

/**
 * Delete an keyboardmenu
 */
exports.delete = function (req, res) {
  var keyboardmenu = req.keyboardmenu;

  keyboardmenu.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(keyboardmenu);
    }
  });
};

/**
 * List of Keyboardmenus
 */
exports.list = function (req, res) {
  Keyboardmenu.find().sort('index').populate('user', 'displayName').exec(function (err, keyboardmenus) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(keyboardmenus);
    }
  });
};

/**
* Update 1x ipad icon
*/
exports.changeIconiPad1x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.iconiPad1xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
* Update 2x ipad icon
*/
exports.changeIconiPad2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.iconiPad2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 2x iphone icon
 */
exports.changeIconiPhone2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.iconiPhone2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
* Update 3x iphone icon
*/
exports.changeIconiPhone3x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.iconiPhone3xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 1x select ipad icon
 */
exports.changeSelectIconiPad1x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.selectIconiPad1xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 2x select ipad icon
 */
exports.changeSelectIconiPad2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.selectIconiPad2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 2x select iphone icon
 */
exports.changeSelectIconiPhone2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.selectIconiPhone2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 3x select iphone icon
 */
exports.changeSelectIconiPhone3x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.selectIconiPhone3xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 1x ipad highlight icon
 */
exports.changeHighlightIconiPad1x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.highlightIconiPad1xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 2x ipad highlight icon
 */
exports.changeHighlightIconiPad2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.highlightIconiPad2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 2x iphone highlight icon
 */
exports.changeHighlightIconiPhone2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.highlightIconiPhone2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 3x iphone highlight icon
 */
exports.changeHighlightIconiPhone3x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.highlightIconiPhone3xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 1x ipad icon theme
 */
exports.changeIconThemeiPad1x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.iconThemeiPad1xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 2x ipad icon theme
 */
exports.changeIconThemeiPad2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.iconThemeiPad2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 2x iphone icon theme
 */
exports.changeIconThemeiPhone2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.iconThemeiPhone2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 3x iphone icon theme
 */
exports.changeIconThemeiPhone3x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.iconThemeiPhone3xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 1x ipad select icon theme
 */
exports.changeSelectIconThemeiPad1x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.selectIconThemeiPad1xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 2x ipad select icon theme
 */
exports.changeSelectIconThemeiPad2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.selectIconThemeiPad2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 2x iphone select icon theme
 */
exports.changeSelectIconThemeiPhone2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.selectIconThemeiPhone2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 3x iphone select icon theme
 */
exports.changeSelectIconThemeiPhone3x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.selectIconThemeiPhone3xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 1x ipad highlight icon theme
 */
exports.changeHighlightIconThemeiPad1x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.highlightIconThemeiPad1xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 2x ipad highlight icon theme
 */
exports.changeHighlightIconThemeiPad2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.highlightIconThemeiPad2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 2x iphone highlight icon theme
 */
exports.changeHighlightIconThemeiPhone2x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.highlightIconThemeiPhone2xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Update 3x iphone highlight icon theme
 */
exports.changeHighlightIconThemeiPhone3x = function (req, res) {
  var keyboardmenu = req.keyboardmenu;
  var message = null;

  if (keyboardmenu) {
    fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading icon'
        });
      } else {
        keyboardmenu.highlightIconThemeiPhone3xURL = 'uploads/' + req.files.file.name;

        keyboardmenu.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(keyboardmenu);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }
};

/**
 * Keyboardmenu middleware
 */
exports.keyboardmenuByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Keyboardmenu is invalid'
    });
  }

  Keyboardmenu.findById(id).populate('user', 'displayName').exec(function (err, keyboardmenu) {
    if (err) {
      return next(err);
    } else if (!keyboardmenu) {
      return res.status(404).send({
        message: 'No keyboardmenu with that identifier has been found'
      });
    }
    req.keyboardmenu = keyboardmenu;
    next();
  });
};

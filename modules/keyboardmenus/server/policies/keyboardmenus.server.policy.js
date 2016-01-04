'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Keyboardmenu Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/keyboardmenus',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPhone3x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPhone3x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPhone3x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPhone3x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPhone3x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPhone3x',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/keyboardmenus',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPhone3x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPhone3x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPhone3x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPhone3x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPhone3x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPad1x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPad2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPhone2x',
      permissions: '*'
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPhone3x',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/keyboardmenus',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPad1x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPad2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPhone2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconiPhone3x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPad1x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPad2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPhone2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconiPhone3x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPad1x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPad2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPhone2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconiPhone3x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPad1x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPad2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPhone2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/iconThemeiPhone3x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPad1x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPad2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPhone2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPhone3x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPad1x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPad2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPhone2x',
      permissions: ['get']
    }, {
      resources: '/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPhone3x',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Keyboardmenu Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an keyboardmenu is being processed and the current user created it then allow any manipulation
  if (req.keyboardmenu && req.user && req.keyboardmenu.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};

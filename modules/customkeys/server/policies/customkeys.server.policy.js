'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Customkey Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/customkeys',
      permissions: '*'
    }, {
      resources: '/api/customkeys/:customkeyId',
      permissions: '*'
    }, {
      resources: '/api/customkeys/:customkeyId/settingImage2x',
      permissions: '*'
    }, {
      resources: '/api/customkeys/:customkeyId/keyboardImage2x',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/customkeys',
      permissions: '*'
    }, {
      resources: '/api/customkeys/:customkeyId',
      permissions: '*'
    }, {
      resources: '/api/customkeys/:customkeyId/settingImage2x',
      permissions: '*'
    }, {
      resources: '/api/customkeys/:customkeyId/keyboardImage2x',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/customkeys',
      permissions: ['get']
    }, {
      resources: '/api/customkeys/:customkeyId',
      permissions: ['get']
    }, {
      resources: '/api/customkeys/:customkeyId/settingImage2x',
      permissions: ['get']
    }, {
      resources: '/api/customkeys/:customkeyId/keyboardImage2x',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Customkey Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an customkey is being processed and the current user created it then allow any manipulation
  if (req.customkey && req.user && req.customkey.user.id === req.user.id) {
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

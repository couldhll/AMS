'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Emojicolor Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/emojicolors',
      permissions: '*'
    }, {
      resources: '/api/emojicolors/:emojicolorId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/emojicolors',
      permissions: '*'
    }, {
      resources: '/api/emojicolors/:emojicolorId',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/emojicolors',
      permissions: ['get']
    }, {
      resources: '/api/emojicolors/:emojicolorId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Emojicolor Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an emojicolor is being processed and the current user created it then allow any manipulation
  if (req.emojicolor && req.user && req.emojicolor.user.id === req.user.id) {
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

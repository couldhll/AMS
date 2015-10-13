'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Emoji Group Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/emojiGroups',
      permissions: '*'
    }, {
      resources: '/api/emojiGroups/:emojiGroupId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/emojiGroups',
      permissions: ['get', 'post']
    }, {
      resources: '/api/emojiGroups/:emojiGroupId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/emojiGroups',
      permissions: ['get']
    }, {
      resources: '/api/emojiGroups/:emojiGroupId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Emoji Group Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an emoji group is being processed and the current user created it then allow any manipulation
  if (req.emojiGroup && req.user && req.emojiGroup.user.id === req.user.id) {
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

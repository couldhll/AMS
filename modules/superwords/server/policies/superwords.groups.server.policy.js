'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Superword Group Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/superwordGroups',
      permissions: '*'
    }, {
      resources: '/api/superwordGroups/:superwordGroupId',
      permissions: '*'
    }, {
      resources: '/api/superwordGroups/:superwordGroupId/superwords',
      permissions: '*'
    }, {
      resources: '/api/superwordGroups/:superwordGroupId/icon2x',
      permissions: '*'
    }, {
      resources: '/api/superwordGroups/:superwordGroupId/icon3x',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/superwordGroups',
      permissions: '*'
    }, {
      resources: '/api/superwordGroups/:superwordGroupId',
      permissions: '*'
    }, {
      resources: '/api/superwordGroups/:superwordGroupId/superwords',
      permissions: '*'
    }, {
      resources: '//api/superwordGroups/:superwordGroupId/icon2x',
      permissions: '*'
    }, {
      resources: '//api/superwordGroups/:superwordGroupId/icon3x',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/superwordGroups',
      permissions: ['get']
    }, {
      resources: '/api/superwordGroups/:superwordGroupId',
      permissions: ['get']
    }, {
      resources: '/api/superwordGroups/:superwordGroupId/superwords',
      permissions: ['get']
    }, {
      resources: '/api/superwordGroups/:superwordGroupId/icon2x',
      permissions: ['get']
    }, {
      resources: '/api/superwordGroups/:superwordGroupId/icon3x',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Superword Group Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an superword group is being processed and the current user created it then allow any manipulation
  if (req.superwordGroup && req.user && req.superwordGroup.user.id === req.user.id) {
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

'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Discoverycenterbanner Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/discoverycenterbanners',
      permissions: '*'
    }, {
      resources: '/api/discoverycenterbanners/:discoverycenterbannerId',
      permissions: '*'
    }, {
      resources: '/api/discoverycenterbanners/:discoverycenterbannerId/bannerImage1x',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/discoverycenterbanners',
      permissions: '*'
    }, {
      resources: '/api/discoverycenterbanners/:discoverycenterbannerId',
      permissions: '*'
    }, {
      resources: '/api/discoverycenterbanners/:discoverycenterbannerId/bannerImage1x',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/discoverycenterbanners',
      permissions: ['get']
    }, {
      resources: '/api/discoverycenterbanners/:discoverycenterbannerId',
      permissions: ['get']
    }, {
      resources: '/api/discoverycenterbanners/:discoverycenterbannerId/bannerImage1x',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Discoverycenterbanner Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an discoverycenterbanner is being processed and the current user created it then allow any manipulation
  if (req.discoverycenterbanner && req.user && req.discoverycenterbanner.user.id === req.user.id) {
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

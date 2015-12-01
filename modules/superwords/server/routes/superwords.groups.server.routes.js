'use strict';

/**
 * Module dependencies.
 */
var superwordGroupsPolicy = require('../policies/superwords.groups.server.policy.js'),
    superwordGroups = require('../controllers/superwords.groups.server.controller.js'),
    superwords = require('../controllers/superwords.server.controller.js');

module.exports = function (app) {
    // Superword Group collection routes
    app.route('/api/superwordGroups').all(superwordGroupsPolicy.isAllowed)
        .get(superwordGroups.list)
        .post(superwordGroups.create);

    // Single superword group routes
    app.route('/api/superwordGroups/:superwordGroupId').all(superwordGroupsPolicy.isAllowed)
        .get(superwordGroups.read)
        .put(superwordGroups.update)
        .delete(superwordGroups.delete);

    // Superwords in group routes
    app.route('/api/superwordGroups/:superwordGroupId/superwords').all(superwordGroupsPolicy.isAllowed)
        .get(superwordGroups.superwords)
        .put(superwords.update)
        .delete(superwords.delete);

    // Finish by binding the superword group middleware
    app.param('superwordGroupId', superwordGroups.superwordGroupByID);
};

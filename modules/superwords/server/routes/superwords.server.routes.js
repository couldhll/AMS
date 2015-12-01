'use strict';

/**
 * Module dependencies.
 */
var superwordsPolicy = require('../policies/superwords.server.policy.js'),
  superwords = require('../controllers/superwords.server.controller.js');

module.exports = function (app) {
  // Superword collection routes
  app.route('/api/superwords').all(superwordsPolicy.isAllowed)
    .get(superwords.list)
    .post(superwords.create);

  // Single superword routes
  app.route('/api/superwords/:superwordId').all(superwordsPolicy.isAllowed)
    .get(superwords.read)
    .put(superwords.update)
    .delete(superwords.delete);

  // Finish by binding the superword middleware
  app.param('superwordId', superwords.superwordByID);
};

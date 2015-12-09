'use strict';

/**
 * Module dependencies.
 */
var spotlightsPolicy = require('../policies/spotlights.server.policy.js'),
  spotlights = require('../controllers/spotlights.server.controller.js');

module.exports = function (app) {
  // Spotlight collection routes
  app.route('/api/spotlights').all(spotlightsPolicy.isAllowed)
    .get(spotlights.list)
    .post(spotlights.create);

  // Single spotlight routes
  app.route('/api/spotlights/:spotlightId').all(spotlightsPolicy.isAllowed)
    .get(spotlights.read)
    .put(spotlights.update)
    .delete(spotlights.delete);

  // Finish by binding the spotlight middleware
  app.param('spotlightId', spotlights.spotlightByID);
};

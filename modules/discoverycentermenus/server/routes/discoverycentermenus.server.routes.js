'use strict';

/**
 * Module dependencies.
 */
var discoverycentermenusPolicy = require('../policies/discoverycentermenus.server.policy.js'),
  discoverycentermenus = require('../controllers/discoverycentermenus.server.controller.js');

module.exports = function (app) {
  // Discoverycentermenu collection routes
  app.route('/api/discoverycentermenus').all(discoverycentermenusPolicy.isAllowed)
    .get(discoverycentermenus.list)
    .post(discoverycentermenus.create);

  // Single discoverycentermenu routes
  app.route('/api/discoverycentermenus/:discoverycentermenuId').all(discoverycentermenusPolicy.isAllowed)
    .get(discoverycentermenus.read)
    .put(discoverycentermenus.update)
    .delete(discoverycentermenus.delete);

  // Edit icon routes
  app.route('/api/discoverycentermenus/:discoverycentermenuId/icon1x').all(discoverycentermenusPolicy.isAllowed)
      .post(discoverycentermenus.changeIcon1x);
  app.route('/api/discoverycentermenus/:discoverycentermenuId/icon2x').all(discoverycentermenusPolicy.isAllowed)
      .post(discoverycentermenus.changeIcon2x);
  app.route('/api/discoverycentermenus/:discoverycentermenuId/icon3x').all(discoverycentermenusPolicy.isAllowed)
      .post(discoverycentermenus.changeIcon3x);

  // Finish by binding the discoverycentermenu middleware
  app.param('discoverycentermenuId', discoverycentermenus.discoverycentermenuByID);
};

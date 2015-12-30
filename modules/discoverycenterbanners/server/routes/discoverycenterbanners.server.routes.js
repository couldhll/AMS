'use strict';

/**
 * Module dependencies.
 */
var discoverycenterbannersPolicy = require('../policies/discoverycenterbanners.server.policy.js'),
  discoverycenterbanners = require('../controllers/discoverycenterbanners.server.controller.js');

module.exports = function (app) {
  // Discoverycenterbanner collection routes
  app.route('/api/discoverycenterbanners').all(discoverycenterbannersPolicy.isAllowed)
    .get(discoverycenterbanners.list)
    .post(discoverycenterbanners.create);

  // Single discoverycenterbanner routes
  app.route('/api/discoverycenterbanners/:discoverycenterbannerId').all(discoverycenterbannersPolicy.isAllowed)
    .get(discoverycenterbanners.read)
    .put(discoverycenterbanners.update)
    .delete(discoverycenterbanners.delete);

  // Edit image routes
  app.route('/api/discoverycenterbanners/:discoverycenterbannerId/bannerImage1x').all(discoverycenterbannersPolicy.isAllowed)
      .post(discoverycenterbanners.changeBannerImage1x);

  // Finish by binding the discoverycenterbanner middleware
  app.param('discoverycenterbannerId', discoverycenterbanners.discoverycenterbannerByID);
};

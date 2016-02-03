'use strict';

/**
 * Module dependencies.
 */
var patchsPolicy = require('../policies/patchs.server.policy.js'),
  patchs = require('../controllers/patchs.server.controller.js');

module.exports = function (app) {
  // Patch collection routes
  app.route('/api/patchs').all(patchsPolicy.isAllowed)
    .get(patchs.list)
    .post(patchs.create);

  // Single patch routes
  app.route('/api/patchs/:patchId').all(patchsPolicy.isAllowed)
    .get(patchs.read)
    .put(patchs.update)
    .delete(patchs.delete);

  // Edit image routes
  app.route('/api/patchs/:patchId/scriptFile').all(patchsPolicy.isAllowed)
      .post(patchs.changeScriptFile);

  // Finish by binding the patch middleware
  app.param('patchId', patchs.patchByID);
};

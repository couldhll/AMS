'use strict';

/**
 * Module dependencies.
 */
var settingmenusPolicy = require('../policies/settingmenus.server.policy.js'),
  settingmenus = require('../controllers/settingmenus.server.controller.js');

module.exports = function (app) {
  // Settingmenu collection routes
  app.route('/api/settingmenus').all(settingmenusPolicy.isAllowed)
    .get(settingmenus.list)
    .post(settingmenus.create);

  // Single settingmenu routes
  app.route('/api/settingmenus/:settingmenuId').all(settingmenusPolicy.isAllowed)
    .get(settingmenus.read)
    .put(settingmenus.update)
    .delete(settingmenus.delete);

  // Edit icon routes
  app.route('/api/settingmenus/:settingmenuId/icon1x').all(settingmenusPolicy.isAllowed)
      .post(settingmenus.changeIcon1x);
  app.route('/api/settingmenus/:settingmenuId/icon2x').all(settingmenusPolicy.isAllowed)
      .post(settingmenus.changeIcon2x);
  app.route('/api/settingmenus/:settingmenuId/icon3x').all(settingmenusPolicy.isAllowed)
      .post(settingmenus.changeIcon3x);
  app.route('/api/settingmenus/:settingmenuId/selectIcon1x').all(settingmenusPolicy.isAllowed)
      .post(settingmenus.changeSelectIcon1x);
  app.route('/api/settingmenus/:settingmenuId/selectIcon2x').all(settingmenusPolicy.isAllowed)
      .post(settingmenus.changeSelectIcon2x);
  app.route('/api/settingmenus/:settingmenuId/selectIcon3x').all(settingmenusPolicy.isAllowed)
      .post(settingmenus.changeSelectIcon3x);

  // Finish by binding the settingmenu middleware
  app.param('settingmenuId', settingmenus.settingmenuByID);
};

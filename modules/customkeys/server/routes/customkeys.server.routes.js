'use strict';

/**
 * Module dependencies.
 */
var customkeysPolicy = require('../policies/customkeys.server.policy.js'),
  customkeys = require('../controllers/customkeys.server.controller.js');

module.exports = function (app) {
  // Customkey collection routes
  app.route('/api/customkeys').all(customkeysPolicy.isAllowed)
    .get(customkeys.list)
    .post(customkeys.create);

  // Single customkey routes
  app.route('/api/customkeys/:customkeyId').all(customkeysPolicy.isAllowed)
    .get(customkeys.read)
    .put(customkeys.update)
    .delete(customkeys.delete);

  // Edit image routes
  app.route('/api/customkeys/:customkeyId/settingImage2x').all(customkeysPolicy.isAllowed)
      .post(customkeys.changeSettingImage2x);
  app.route('/api/customkeys/:customkeyId/keyboardImage2x').all(customkeysPolicy.isAllowed)
      .post(customkeys.changeKeyboardImage2x);

  // Finish by binding the customkey middleware
  app.param('customkeyId', customkeys.customkeyByID);
};

'use strict';

/**
 * Module dependencies.
 */
var emojicolorsPolicy = require('../policies/emojicolors.server.policy.js'),
  emojicolors = require('../controllers/emojicolors.server.controller.js');

module.exports = function (app) {
  // Emojicolor collection routes
  app.route('/api/emojicolors').all(emojicolorsPolicy.isAllowed)
    .get(emojicolors.list)
    .post(emojicolors.create);

  // Single emojicolor routes
  app.route('/api/emojicolors/:emojicolorId').all(emojicolorsPolicy.isAllowed)
    .get(emojicolors.read)
    .put(emojicolors.update)
    .delete(emojicolors.delete);

  // Finish by binding the emojicolor middleware
  app.param('emojicolorId', emojicolors.emojicolorByID);
};

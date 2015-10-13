'use strict';

/**
 * Module dependencies.
 */
var emojisPolicy = require('../policies/emojis.server.policy'),
  emojis = require('../controllers/emojis.server.controller');

module.exports = function (app) {
  // Emoji collection routes
  app.route('/api/emojis').all(emojisPolicy.isAllowed)
    .get(emojis.list)
    .post(emojis.create);

  // Single emoji routes
  app.route('/api/emojis/:emojiId').all(emojisPolicy.isAllowed)
    .get(emojis.read)
    .put(emojis.update)
    .delete(emojis.delete);

  // Finish by binding the emoji middleware
  app.param('emojiId', emojis.emojiByID);
};

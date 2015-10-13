'use strict';

/**
 * Module dependencies.
 */
var emojiGroupsPolicy = require('../policies/emojis.groups.server.policy'),
  emojiGroups = require('../controllers/emojis.groups.server.controller');

module.exports = function (app) {
  // Emoji Group collection routes
  app.route('/api/emojiGroups').all(emojiGroupsPolicy.isAllowed)
    .get(emojiGroups.list)
    .post(emojiGroups.create);

  // Single emoji grourp routes
  app.route('/api/emojiGroups/:emojiGroupId').all(emojiGroupsPolicy.isAllowed)
    .get(emojiGroups.read)
    .put(emojiGroups.update)
    .delete(emojiGroups.delete);

  // Finish by binding the emoji group middleware
  app.param('emojiGroupId', emojiGroups.emojiGroupByID);
};

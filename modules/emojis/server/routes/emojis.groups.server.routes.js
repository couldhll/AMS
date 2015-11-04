'use strict';

/**
 * Module dependencies.
 */
var emojiGroupsPolicy = require('../policies/emojis.groups.server.policy'),
    emojiGroups = require('../controllers/emojis.groups.server.controller'),
    emojis = require('../controllers/emojis.server.controller');

module.exports = function (app) {
    // Emoji Group collection routes
    app.route('/api/emojiGroups').all(emojiGroupsPolicy.isAllowed)
        .get(emojiGroups.list)
        .post(emojiGroups.create);

    // Single emoji group routes
    app.route('/api/emojiGroups/:emojiGroupId').all(emojiGroupsPolicy.isAllowed)
        .get(emojiGroups.read)
        .put(emojiGroups.update)
        .delete(emojiGroups.delete);

    // Emojis in group routes
    app.route('/api/emojiGroups/:emojiGroupId/emojis').all(emojiGroupsPolicy.isAllowed)
        .get(emojiGroups.emojis)
        .put(emojis.update)
        .delete(emojis.delete);

    // Edit icon routes
    app.route('/api/emojiGroups/:emojiGroupId/icon2x').all(emojiGroupsPolicy.isAllowed)
        .post(emojiGroups.changeIcon2x);
    app.route('/api/emojiGroups/:emojiGroupId/icon3x').all(emojiGroupsPolicy.isAllowed)
        .post(emojiGroups.changeIcon3x);

    // Finish by binding the emoji group middleware
    app.param('emojiGroupId', emojiGroups.emojiGroupByID);
};

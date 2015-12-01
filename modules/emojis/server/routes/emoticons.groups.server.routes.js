'use strict';

/**
 * Module dependencies.
 */
var emoticonGroupsPolicy = require('../policies/emoticons.groups.server.policy'),
    emoticonGroups = require('../controllers/emoticons.groups.server.controller'),
    emoticons = require('../controllers/emoticons.server.controller');

module.exports = function (app) {
    // Emoticon Group collection routes
    app.route('/api/emoticonGroups').all(emoticonGroupsPolicy.isAllowed)
        .get(emoticonGroups.list)
        .post(emoticonGroups.create);

    // Single emoticon group routes
    app.route('/api/emoticonGroups/:emoticonGroupId').all(emoticonGroupsPolicy.isAllowed)
        .get(emoticonGroups.read)
        .put(emoticonGroups.update)
        .delete(emoticonGroups.delete);

    // Emoticons in group routes
    app.route('/api/emoticonGroups/:emoticonGroupId/emoticons').all(emoticonGroupsPolicy.isAllowed)
        .get(emoticonGroups.emoticons)
        .put(emoticons.update)
        .delete(emoticons.delete);

    // Finish by binding the emoticon group middleware
    app.param('emoticonGroupId', emoticonGroups.emoticonGroupByID);
};

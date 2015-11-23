'use strict';

/**
 * Module dependencies.
 */
var emoticonsPolicy = require('../policies/emoticons.server.policy'),
  emoticons = require('../controllers/emoticons.server.controller');

module.exports = function (app) {
  // Emoticon collection routes
  app.route('/api/emoticons').all(emoticonsPolicy.isAllowed)
    .get(emoticons.list)
    .post(emoticons.create);

  // Single emoticon routes
  app.route('/api/emoticons/:emoticonId').all(emoticonsPolicy.isAllowed)
    .get(emoticons.read)
    .put(emoticons.update)
    .delete(emoticons.delete);

  // Finish by binding the emoticon middleware
  app.param('emoticonId', emoticons.emoticonByID);
};

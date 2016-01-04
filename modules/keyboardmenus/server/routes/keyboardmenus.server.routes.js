'use strict';

/**
 * Module dependencies.
 */
var keyboardmenusPolicy = require('../policies/keyboardmenus.server.policy.js'),
    keyboardmenus = require('../controllers/keyboardmenus.server.controller.js');

module.exports = function (app) {
    // Keyboardmenu collection routes
    app.route('/api/keyboardmenus').all(keyboardmenusPolicy.isAllowed)
        .get(keyboardmenus.list)
        .post(keyboardmenus.create);

    // Single keyboardmenu routes
    app.route('/api/keyboardmenus/:keyboardmenuId').all(keyboardmenusPolicy.isAllowed)
        .get(keyboardmenus.read)
        .put(keyboardmenus.update)
        .delete(keyboardmenus.delete);

    // Edit icon routes
    app.route('/api/keyboardmenus/:keyboardmenuId/iconiPad1x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeIconiPad1x);
    app.route('/api/keyboardmenus/:keyboardmenuId/iconiPad2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeIconiPad2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/iconiPhone2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeIconiPhone2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/iconiPhone3x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeIconiPhone3x);
    app.route('/api/keyboardmenus/:keyboardmenuId/selectIconiPad1x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeSelectIconiPad1x);
    app.route('/api/keyboardmenus/:keyboardmenuId/selectIconiPad2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeSelectIconiPad2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/selectIconiPhone2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeSelectIconiPhone2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/selectIconiPhone3x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeSelectIconiPhone3x);
    app.route('/api/keyboardmenus/:keyboardmenuId/highlightIconiPad1x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeHighlightIconiPad1x);
    app.route('/api/keyboardmenus/:keyboardmenuId/highlightIconiPad2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeHighlightIconiPad2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/highlightIconiPhone2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeHighlightIconiPhone2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/highlightIconiPhone3x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeHighlightIconiPhone3x);
    app.route('/api/keyboardmenus/:keyboardmenuId/iconThemeiPad1x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeIconThemeiPad1x);
    app.route('/api/keyboardmenus/:keyboardmenuId/iconThemeiPad2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeIconThemeiPad2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/iconThemeiPhone2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeIconThemeiPhone2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/iconThemeiPhone3x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeIconThemeiPhone3x);
    app.route('/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPad1x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeSelectIconThemeiPad1x);
    app.route('/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPad2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeSelectIconThemeiPad2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPhone2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeSelectIconThemeiPhone2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/selectIconThemeiPhone3x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeSelectIconThemeiPhone3x);
    app.route('/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPad1x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeHighlightIconThemeiPad1x);
    app.route('/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPad2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeHighlightIconThemeiPad2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPhone2x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeHighlightIconThemeiPhone2x);
    app.route('/api/keyboardmenus/:keyboardmenuId/highlightIconThemeiPhone3x').all(keyboardmenusPolicy.isAllowed)
        .post(keyboardmenus.changeHighlightIconThemeiPhone3x);

    // Finish by binding the keyboardmenu middleware
    app.param('keyboardmenuId', keyboardmenus.keyboardmenuByID);
};

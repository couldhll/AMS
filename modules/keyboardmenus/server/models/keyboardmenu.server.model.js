'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Keyboardmenu Schema
 */
var KeyboardmenuSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    default: '',
    trim: true,
    required: 'Type cannot be blank'
  },
  position: {
    type: String,
    default: '',
    trim: true,
    required: 'Position cannot be blank'
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  selectTitle: {
    type: String,
    default: '',
    trim: true
  },
  iconFile: {
    type: String,
    default: 'normal.png'
  },
  iconiPad1xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/normal_ipad.png'
  },
  iconiPad2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/normal_ipad@2x.png'
  },
  iconiPhone2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/normal_iphone@2x.png'
  },
  iconiPhone3xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/normal_iphone@3x.png'
  },
  selectIconFile: {
    type: String,
    default: 'select.png'
  },
  selectIconiPad1xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/select_ipad.png'
  },
  selectIconiPad2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/select_ipad@2x.png'
  },
  selectIconiPhone2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/select_iphone@2x.png'
  },
  selectIconiPhone3xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/select_iphone@3x.png'
  },
  highlightIconFile: {
    type: String,
    default: 'toolbar_selection.png'
  },
  highlightIconiPad1xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/toolbar_selection@2x.png'
  },
  highlightIconiPad2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/toolbar_selection@2x.png'
  },
  highlightIconiPhone2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/toolbar_selection@2x.png'
  },
  highlightIconiPhone3xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/toolbar_selection@2x.png'
  },
  iconThemeFile: {
    type: String,
    default: 'normal.png'
  },
  iconThemeiPad1xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/theme_ipad.png'
  },
  iconThemeiPad2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/theme_ipad@2x.png'
  },
  iconThemeiPhone2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/theme_iphone@2x.png'
  },
  iconThemeiPhone3xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/theme_iphone@3x.png'
  },
  selectIconThemeFile: {
    type: String,
    default: 'select.png'
  },
  selectIconThemeiPad1xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/select_ipad.png'
  },
  selectIconThemeiPad2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/select_ipad@2x.png'
  },
  selectIconThemeiPhone2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/select_iphone@2x.png'
  },
  selectIconThemeiPhone3xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/select_iphone@3x.png'
  },
  highlightIconThemeFile: {
    type: String,
    default: 'toolbar_selection_theme.png'
  },
  highlightIconThemeiPad1xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/toolbar_selection_theme@2x.png'
  },
  highlightIconThemeiPad2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/toolbar_selection_theme@2x.png'
  },
  highlightIconThemeiPhone2xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/toolbar_selection_theme@2x.png'
  },
  highlightIconThemeiPhone3xURL: {
    type: String,
    default: 'modules/keyboardmenus/client/img/image/toolbar_selection_theme@2x.png'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  index: {
    type: Number
  }
});

mongoose.model('Keyboardmenu', KeyboardmenuSchema);

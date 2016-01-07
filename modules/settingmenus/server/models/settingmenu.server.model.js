'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Settingmenu Schema
 */
var SettingmenuSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  selectName: {
    type: String,
    default: '',
    trim: true
  },
  iconFile: {
    type: String,
    default: 'normal.png'
  },
  icon1xURL: {
    type: String,
    default: 'modules/settingmenus/client/img/normal.png'
  },
  icon2xURL: {
    type: String,
    default: 'modules/settingmenus/client/img/normal@2x.png'
  },
  icon3xURL: {
    type: String,
    default: 'modules/settingmenus/client/img/normal@3x.png'
  },
  selectIconFile: {
    type: String,
    default: 'select.png'
  },
  selectIcon1xURL: {
    type: String,
    default: 'modules/settingmenus/client/img/select.png'
  },
  selectIcon2xURL: {
    type: String,
    default: 'modules/settingmenus/client/img/select@2x.png'
  },
  selectIcon3xURL: {
    type: String,
    default: 'modules/settingmenus/client/img/select@3x.png'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  index: {
    type: Number
  }
});

mongoose.model('Settingmenu', SettingmenuSchema);

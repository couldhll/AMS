'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Discoverycentermenu Schema
 */
var DiscoverycentermenuSchema = new Schema({
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
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  detail: {
    type: String,
    default: '',
    trim: true
  },
  iconFile: {
    type: String,
    default: 'icon.png'
  },
  icon1xURL: {
    type: String,
    default: 'modules/discoverycentermenus/client/img/icon.png'
  },
  icon2xURL: {
    type: String,
    default: 'modules/discoverycentermenus/client/img/icon@2x.png'
  },
  icon3xURL: {
    type: String,
    default: 'modules/discoverycentermenus/client/img/icon@3x.png'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  index: {
    type: Number
  }
});

mongoose.model('Discoverycentermenu', DiscoverycentermenuSchema);

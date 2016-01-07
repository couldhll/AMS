'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Discoverycenterbanner Schema
 */
var DiscoverycenterbannerSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  openUrl: {
    type: String,
    default: '',
    trim: true,
    required: 'Url cannot be blank'
  },
  bannerImageFile: {
    type: String,
    default: 'discoverycenter_banner.png'
  },
  bannerImage1xURL: {
    type: String,
    default: 'modules/discoverycenterbanners/client/img/discoverycenter_banner.png'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  index: {
    type: Number
  }
});

mongoose.model('Discoverycenterbanner', DiscoverycenterbannerSchema);

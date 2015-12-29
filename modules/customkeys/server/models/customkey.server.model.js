'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Customkey Schema
 */
var CustomkeySchema = new Schema({
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
  settingImageFile: {
    type: String,
    default: 'settingImage2xURL'
  },
  settingImage2xURL: {
    type: String,
    default: 'modules/customkeys/client/img/image/settingImage2xURL@2x.png'
  },
  keyboardImageFile: {
    type: String,
    default: 'keyboardImage2xURL'
  },
  keyboardImage2xURL: {
    type: String,
    default: 'modules/customkeys/client/img/image/keyboardImage2xURL@2x.png'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  index: {
    type: Number
  }
});

mongoose.model('Customkey', CustomkeySchema);

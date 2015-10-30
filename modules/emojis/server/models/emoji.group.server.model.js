'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Emoji Group Schema
 */
var EmojiGroupSchema = new Schema({
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
  type: {
    type: String,
    default: '',
    trim: true,
    required: 'Type cannot be blank'
  },
  file: {
    type: String,
    default: '',
    trim: true,
    required: 'File cannot be blank'
  },
  icon: {
    type: String,
    default: '',
    trim: true,
    required: 'Icon cannot be blank'
  },
  seperate: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  emojis: [{
    type: Schema.ObjectId,
    ref: 'Emoji'
  }],
  index: {
    type: Number
  }
});

mongoose.model('EmojiGroup', EmojiGroupSchema);

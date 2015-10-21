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

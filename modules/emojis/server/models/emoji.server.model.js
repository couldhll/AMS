'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Emoji Schema
 */
var EmojiSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  group: {
    type: Schema.ObjectId,
    ref: 'EmojiGroup'
  }
});

mongoose.model('Emoji', EmojiSchema);

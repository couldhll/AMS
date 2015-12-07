'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Emojicolor Schema
 */
var EmojicolorSchema = new Schema({
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
  color: {
    type: Number,
    default: -1,
    trim: true,
    required: 'Color cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  index: {
    type: Number
  }
});

mongoose.model('Emojicolor', EmojicolorSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Superword Schema
 */
var SuperwordSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  pattern: {
    type: String,
    default: '',
    trim: true,
    required: 'Pattern cannot be blank'
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  head: {
    type: String,
    trim: true
  },
  tail: {
    type: String,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  group: {
    type: Schema.ObjectId,
    ref: 'SuperwordGroup'
  },
  index: {
    type: Number
  }
});

mongoose.model('Superword', SuperwordSchema);

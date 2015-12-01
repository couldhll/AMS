'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Superword Group Schema
 */
var SuperwordGroupSchema = new Schema({
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
  superwords: [{
    type: Schema.ObjectId,
    ref: 'Superword'
  }],
  index: {
    type: Number
  }
});

mongoose.model('SuperwordGroup', SuperwordGroupSchema);

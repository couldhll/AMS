'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Patch Schema
 */
var PatchSchema = new Schema({
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
  scriptFile: {
    type: String
  },
  mode: {
    type: String
  },
  script: {
    type: String
  },
  host: {
    type: String
  },
  encrypt: {
    type: Boolean
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  index: {
    type: Number
  }
});

mongoose.model('Patch', PatchSchema);

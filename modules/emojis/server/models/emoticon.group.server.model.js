'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Emoticon Group Schema
 */
var EmoticonGroupSchema = new Schema({
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
  seperate: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  emoticons: [{
    type: Schema.ObjectId,
    ref: 'Emoticon'
  }],
  index: {
    type: Number
  }
});

mongoose.model('EmoticonGroup', EmoticonGroupSchema);

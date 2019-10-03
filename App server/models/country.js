const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const country = new Schema({
  name: String,
  language: String,
});

module.exports = model('country', country);

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const caseTypeSchema = new Schema({
  title: String,
});

module.exports = model('CaseType', caseTypeSchema);

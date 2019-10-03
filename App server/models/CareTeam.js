const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const country = new Schema({
  name: String,
});
const language = new Schema({
  name: String,
});
const careTeamSchema = new Schema({
  name: String,
  patientNumber: { type: Number, default: 0 },
  type: String,
  countries: [country],
  languages: [language],
});

module.exports = model('CareTeam', careTeamSchema);

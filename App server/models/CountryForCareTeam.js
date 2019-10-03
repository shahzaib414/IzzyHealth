const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const CountryForCareTeamSchema = new Schema({
  countryName: String,
  careTeamId: String,
});

module.exports = model('CountryForCareTeam', CountryForCareTeamSchema);

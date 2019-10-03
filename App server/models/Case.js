const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const caseSchema = new Schema({
  patientId: String,
  doctorId: String,
  openClose: { type: String, default: 'open' },
  caseType: String,
  dateOfCase: Date,
  cliente: Number,
  description: String,
  subject: String,
  prescriptionId: [{ type: String }],
});

module.exports = model('Case', caseSchema);

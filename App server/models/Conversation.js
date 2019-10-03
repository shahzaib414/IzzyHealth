const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  body: String,
  type: String,
  fileUrl: String,
  doctorId: String,
  patientId: String,
  seen: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const conversationSchema = new Schema({
  caseId: String,
  createdDate: Date,
  messages: [messageSchema],
  doctorId: String,
  patientId: String,
  status: { type: String, default: 'open' },
});

module.exports = model('Conversation', conversationSchema);

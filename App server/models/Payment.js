const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const paymentSchema = new Schema({
  patientId: Schema.Types.ObjectId,
  paymentNumber: String,
  createdDate: Date,
  paymentMethod: String,
  amount: Number,
});

module.exports = model('Payment', paymentSchema);

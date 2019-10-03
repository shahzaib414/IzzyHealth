const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const billingSchema = new Schema({
  patientId: Schema.Types.ObjectId,
  accountBalance: Number,
  charges: Number,
  credits: Number,
  payments: [Schema.Types.ObjectId],
  invoices: [Schema.Types.ObjectId],
});

module.exports = model('Billing', billingSchema);

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const invoiceSchema = new Schema({
  invoiceNumber: String,
  createdDate: Date,
  paybeforeDate: Date,
  patientId: Schema.Types.ObjectId,
  concept: String,
  amount: Number,
  discountPercent: Number,
  discountAmount: Number,
  totalAmount: Number,
  previousBalance: Number,
  payedAmount: Number,
  pendingBalance: Number,
  status: String,
});

module.exports = model('Invoice', invoiceSchema);

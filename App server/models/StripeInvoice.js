const mongoose = require('mongoose');
// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const StripeInvoice = new Schema({
  stripeInvoiceId: String,
  stripeCustomerID: String,
  date: Date,
});

module.exports = mongoose.model('StripeInvoice', StripeInvoice);

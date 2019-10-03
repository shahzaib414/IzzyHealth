const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  validity: Date,
  noOfMessage: Number,
  price: Number,
});

module.exports = mongoose.model('Subscription', subscriptionSchema);

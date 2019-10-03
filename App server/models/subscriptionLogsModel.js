const mongoose = require('mongoose');

const subscriptionLogsSchema = mongoose.Schema({
  subs_stripe_id: String,
  user_id: mongoose.Schema.Types.ObjectId,
  subscriptionPlan: String,
  createdDate: Date,
  active: Boolean,
});

module.exports = mongoose.model('SubscriptionLog', subscriptionLogsSchema);

const path = require('path');
const pug = require('pug');
const UserModel = require('../../../models/UserModel');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const emailSender = require('../../../common/nodemailerSender');

const constant = require('../../../constants');
// eslint-disable-next-line import/order
const stripe = require('stripe')(constant.STRIPE_API);
const SubscriptionSchema = require('../../../models/subscriptionLogsModel');
const { createNotification } = require('../../Notification/UseCases');

const PaymentFailure = async (EventData) => {
  try {
    const customerID = EventData.customer;
    const user = await UserModel.findOne({
      stripeID: customerID,
    }).lean();
    const subscriptionDetails = await SubscriptionSchema.findOne({
      // eslint-disable-next-line no-underscore-dangle
      user_id: user._id,
    });
    await stripe.subscriptions.del(subscriptionDetails.subs_stripe_id);
    subscriptionDetails.subs_stripe_id = '';
    subscriptionDetails.active = false;
    await subscriptionDetails.save();
    const text = 'Please update you payment method to continue using our Service';
    const html = pug.renderFile(
      path.resolve(__dirname, '../../../templates/Events/paymentFailure.pug'),
      { text },
    );
    await emailSender(
      { from: process.env.EMAIL_SENDER, to: user.email, subject: 'Subscription Suspended' },
      { html, text },
    );

    /**
     * Notify user in App
     */
    const notificationData = {
      // eslint-disable-next-line no-underscore-dangle
      userId: user._id,
      title: 'Payment Failure',
      type: 'user',
    };
    await createNotification(notificationData);
  } catch (err) {
    throw new IzzyLogicError(err.message);
  }
};

module.exports = PaymentFailure;

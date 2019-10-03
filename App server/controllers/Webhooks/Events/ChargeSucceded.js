/* eslint-disable no-underscore-dangle */
const path = require('path');
const pug = require('pug');
const UserModel = require('../../../models/UserModel');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const emailSender = require('../../../common/nodemailerSender');
const StripeInvoiceSchema = require('../../../models/StripeInvoice');
const createInvitationDiscount = require('../../Shared/createInvitationDiscount');
const InvitationModel = require('../../../models/Invitation');
const constant = require('../../../constants');
// eslint-disable-next-line import/order
const stripe = require('stripe')(constant.STRIPE_API);

const { createNotification } = require('../../Notification/UseCases');

const ChargeSucceded = async (EventData) => {
  try {
    const customerID = EventData.customer;
    const invoiceID = EventData.invoice;

    const User = await UserModel.findOne({
      stripeID: customerID,
    });
    User.rubies += 10000;
    await User.save();
    await StripeInvoiceSchema.create({
      stripeInvoiceId: invoiceID,
      stripeCustomerID: customerID,
      date: new Date(),
    });

    const invitation = await InvitationModel.findOne({
      rerenceCode: User.referredBy,
      invited: User._id,
      status: 'pending',
    }).lean();

    if (invitation) {
      // eslint-disable-next-line no-console
      await createInvitationDiscount(invitation, { applyTo: 'inviter' }).catch(console.log);
    }

    const generatedInvoice = await stripe.invoices.retrieve(invoiceID);
    const accountName = generatedInvoice.account_name;
    const amountPaid = (generatedInvoice.amount_paid / 100).toFixed(2);

    /* if (generatedInvoice.billing_reason === 'subscription_create') {} */
    /**
     * Email notification enabled for monthly charge
     */
    const html = pug.renderFile(
      path.resolve(__dirname, '../../../templates/Events/stripeInvoice.pug'),
      { accountName, amountPaid },
    );
    const text = '';
    await emailSender(
      { from: process.env.EMAIL_SENDER, to: User.email, subject: 'Invoice' },
      { html, text },
    );
    /**
     * Notify user in App
     */
    const notificationData = {
      userId: User.id,
      title: 'Subscription Payment',
      type: 'user',
    };
    await createNotification(notificationData);
  } catch (err) {
    throw new IzzyLogicError(err.message);
  }
};

module.exports = ChargeSucceded;

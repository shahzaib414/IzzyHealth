const stripe = require('stripe')(process.env.STRIPE_API);
const IzzyLogicError = require('../../common/IzzyLogicError');
const UserModel = require('../../models/UserModel');
const IvitationModel = require('../../models/Invitation');

const applyToTypes = ['inviter', 'invited'];

const createInvitationDiscount = async (invitation, { applyTo = 'inviter' } = {}) => {
  if (!invitation) {
    throw new IzzyLogicError('Ivitation is required in createIvitationCoupons');
  }

  if (invitation.status !== 'pending') {
    throw new IzzyLogicError('Invitation has expired');
  }

  if (!applyToTypes.includes(applyTo)) {
    throw new IzzyLogicError('Invalid applyTo, must be inviter or invited');
  }

  if (applyTo === 'inviter' && invitation.inviterStatus !== 'pending') {
    throw new IzzyLogicError('Invitation has expired for inviter');
  }

  if (applyTo === 'invited' && invitation.invitedStatus !== 'pending') {
    throw new IzzyLogicError('Invitation has expired for invited');
  }

  /*
  const coupon = await stripe.coupons.create({
    duration: 'once',
    amount_off: 5.0,
    name: 'discount of 5 usd',
    currency: 'USD',
  });
  */

  const { _id, inviter, invited, inviterStatus, invitedStatus } = invitation;

  if (applyTo === 'inviter') {
    const user = await UserModel.findById(inviter).lean();

    const customer = await stripe.customers.retrieve(user.stripeID);

    const balance = Number(customer.balance) - 5.0;

    stripe.customers.update(user.stripeID, { balance });

    // await stripe.subscriptions.update(user.stripeID, { coupon: coupon.id });
    await IvitationModel.updateOne({ _id }, { $set: { inviterStatus: 'complete' } });

    if (invitedStatus !== 'pending') {
      await IvitationModel.updateOne({ _id }, { $set: { status: 'complete' } });
    }
  }

  if (applyTo === 'invited') {
    const user = await UserModel.findById(invited).lean();

    const customer = await stripe.customers.retrieve(user.stripeID);

    const balance = Number(customer.balance) - 5.0;

    stripe.customers.update(user.stripeID, { balance });

    // await stripe.subscriptions.update(user.stripeID, { coupon: coupon.id });
    await IvitationModel.updateOne({ _id }, { $set: { invitedStatus: 'complete' } });

    if (inviterStatus !== 'pending') {
      await IvitationModel.updateOne({ _id }, { $set: { status: 'complete' } });
    }
  }
};

module.exports = createInvitationDiscount;

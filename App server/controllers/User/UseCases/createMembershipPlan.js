const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const constant = require('../../../constants');
// eslint-disable-next-line import/order
const stripe = require('stripe')(constant.STRIPE_API);
const UserModel = require('../../../models/UserModel');
const SubcriptionLogsSchema = require('../../../models/subscriptionLogsModel');
const createInvitationDiscount = require('../../Shared/createInvitationDiscount');
const InvitationModel = require('../../../models/Invitation');

const createMembershipPlan = async ({ token, email, planId, isNewCustomer = true }) => {
  try {
    const rules = {
      email: 'required|email',
      planId: 'required',
    };
    if (isNewCustomer) {
      rules.token = 'required';
    }

    const fieldsValidated = await Validator.validateAsync({ email, planId }, { rules });
    if (fieldsValidated !== true) {
      throw new IzzyFieldErrors('Field errors:', fieldsValidated);
    }
    let customer = {};
    const User = await UserModel.findOne({ email });
    if (isNewCustomer) {
      customer = await stripe.customers.create({
        source: token,
        email,
      });
      User.stripeID = customer.id;
    } else {
      customer.id = User.stripeID;
    }
    const subscriptionExist = await SubcriptionLogsSchema.findOne({ user_id: User.id }).lean();
    if (subscriptionExist.active) {
      throw new IzzyLogicError('You already have subcription');
    }
    const subscriptionResponse = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: planId,
        },
      ],
    });
    User.subscriptionPlan = subscriptionResponse.plan.nickname;
    await User.save();

    // Update or Craete Subscription Model
    await SubcriptionLogsSchema.updateOne(
      {
        user_id: User.id,
      },
      {
        subs_stripe_id: subscriptionResponse.id,
        user_id: User.id,
        subscriptionPlan: planId,
        createdDate: new Date(),
        active: true,
      },
      { upsert: true },
    );

    const invitation = await InvitationModel.findOne({
      rerenceCode: User.referredBy,
      invited: User.id,
      status: 'pending',
    }).lean();

    if (invitation) {
      // eslint-disable-next-line no-console
      await createInvitationDiscount(invitation, { applyTo: 'invited' }).catch(console.log);
    }

    return subscriptionResponse;
  } catch (err) {
    throw new IzzyLogicError(err.message);
  }
};

module.exports = createMembershipPlan;

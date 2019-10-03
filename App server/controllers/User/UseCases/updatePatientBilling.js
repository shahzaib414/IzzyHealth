const Validator = require('../../../common/validator');
const UserModel = require('../../../models/UserModel');
const SubscriptionLogsModel = require('../../../models/subscriptionLogsModel');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const constant = require('../../../constants');
// eslint-disable-next-line import/order
const stripe = require('stripe')(constant.STRIPE_API);

const updateOrCancelPatientBilling = async ({ id, planId = {}, changeToFree }) => {
  try {
    const rules = {
      id: 'required',
      changeToFree: 'required|boolean',
    };
    const fieldsValidated = await Validator.validateAsync({ id, changeToFree }, { rules });
    if (fieldsValidated !== true) {
      throw new IzzyFieldErrors(IzzyFieldErrors.ERROR_MESSAGES.MISSING_FIELD, fieldsValidated);
    }
    const user = await UserModel.findById(id);
    if (!user) {
      throw new IzzyLogicError(IzzyLogicError.ERROR_MESSAGES.NOT_FOUND);
    }
    const subscription = await SubscriptionLogsModel.findOne({ user_id: id });
    if (!subscription) {
      throw new IzzyLogicError('You are not subscribed to any membership');
    }

    if (changeToFree) {
      await stripe.subscriptions.del(subscription.subs_stripe_id);
      // Todo Remove this line
      subscription.active = false;
      subscription.subs_stripe_id = '';
      await subscription.save();
      user.subscriptionPlan = 'free';
      await user.save();
      return {
        msg: ` Your plan is changed to ${user.subscriptionPlan}`,
      };
    }
    if (Object.keys(planId).length === 0) {
      throw new IzzyLogicError('Plan ID is not provided');
    }
    const StripeSubscriptionObject = await stripe.subscriptions.retrieve(
      subscription.subs_stripe_id,
    );
    const subscriptionResponse = await stripe.subscriptions.update(subscription.subs_stripe_id, {
      items: [
        {
          id: StripeSubscriptionObject.items.data[0].id,
          plan: planId,
        },
      ],
    });
    user.subscriptionPlan = subscriptionResponse.plan.nickname;
    await user.save();
    subscription.subscriptionPlan = planId;
    subscription.subs_stripe_id = subscriptionResponse.id;
    subscription.createdDate = new Date();
    await subscription.save();

    return subscriptionResponse;
  } catch (err) {
    throw new IzzyLogicError(err.message);
  }
};
module.exports = updateOrCancelPatientBilling;

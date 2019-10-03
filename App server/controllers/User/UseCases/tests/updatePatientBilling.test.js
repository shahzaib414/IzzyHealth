const mongoose = require('mongoose');
const UserSchema = require('../../../../models/UserModel');
const updatePatientBilling = require('../updatePatientBilling');
const IzzyFieldError = require('../../../../common/IzzyFieldErrors');

describe('test update Patient Billing', () => {
  const updateBillingData = {
    id: '5d7004cc4a4dc76a51ba3802',
    planId: 'plan_FjmvOabKLrh3FD',
    changeToFree: 'false',
  };
  const emptyFieldTest = {};
  let subcriptionPlan = {};
  beforeAll(async () => {
    mongoose.connect(process.env.MONGODB_URL_TEST);
  });

  test('Updating Patient Billing subscription', async () => {
    const response = await updatePatientBilling(updateBillingData);
    subcriptionPlan = response.items.data[0].plan.nickname;
    expect(response.items.data[0].plan.id).toBe(updateBillingData.planId);
  });

  test('Throw validation Error without Params', async () => {
    try {
      await updatePatientBilling(emptyFieldTest);
    } catch (err) {
      expect(err.message).toBe(IzzyFieldError.ERROR_MESSAGES.MISSING_FIELD);
    }
  });

  test('Verify activated subscription plan', async () => {
    const user = await UserSchema.findById(updateBillingData.id);
    expect(user.subscriptionPlan).toBe(subcriptionPlan);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

const path = require('path');
const pug = require('pug');
const UserModel = require('../../../models/UserModel');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const emailSender = require('../../../common/nodemailerSender');

const CustomerSubCreated = async (EventData) => {
  try {
    const customerID = EventData.customer;
    const user = await UserModel.findOneAndUpdate({
      stripeID: customerID,
    }).lean();

    const text = EventData.plan.nickname;
    const html = pug.renderFile(
      path.resolve(__dirname, '../../../templates/Events/createSubscription.pug'),
      { text },
    );
    await emailSender(
      { from: process.env.EMAIL_SENDER, to: user.email, subject: 'Welcome to Paid account' },
      { html, text },
    );
  } catch (err) {
    throw new IzzyLogicError(err.message);
  }
};
module.exports = CustomerSubCreated;

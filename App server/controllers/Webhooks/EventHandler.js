const IzzyLogicError = require('../../common/IzzyLogicError');
const { PaymentFailure, CustomerSubCreated, ChargeSucceded } = require('./Events');

exports.EventHandler = async (req, res) => {
  let event;
  try {
    event = req.body;
    switch (event.type) {
      case 'customer.subscription.created':
        await CustomerSubCreated(event.data.object);
        break;
      case 'charge.failed':
        await PaymentFailure(event.data.object);
        break;
      case 'charge.succeeded':
        await ChargeSucceded(event.data.object);
        break;
      default:
        return res.status(400).end();
    }

    return res.json({ received: true });
  } catch (err) {
    throw new IzzyLogicError(`Webhook Error: ${err.message}`);
  }
};

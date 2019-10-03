const constant = require('../constants');

const stripe = require('stripe')(constant.STRIPE_API);
/**
 * Uncomment this code if need to create product
 */
/*

stripe.products.create({
    name: 'Izzay Membership',
    type: 'service',
  }, function(err, product) {
      console.log(err)
    console.log(product)
  });
  */

/**
 * Generating Token wo testing
 */
stripe.tokens.create(
  {
    card: {
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 2020,
      cvc: '123',
    },
  },
  // eslint-disable-next-line func-names
  function(err, token) {
    if (err) {
      console.log(err);
    } else {
      console.log(token);
    }
  },
);

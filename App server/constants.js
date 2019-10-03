module.exports = Object.freeze({
  PASSWORD_ENCRYPTION: process.env.PASSWORD_ENCRYPTION || 's0//P4$$w0rD',
  SEND_GRID_API_KEY:
    process.env.SEND_GRID_API_KEY ||
    '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',
  HOST: process.env.HOST || 'localhost:3000',
  SERVER_POST: process.env.SERVER_POST || 3000,
  EMAIL_SENDER: process.env.EMAIL_SENDER || 's.s@izzyhealth.org',
  PASS: process.env.PASS || '@@Joswell212',
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/Izzayi',
  STRIPE_API: process.env.STRIPE_API || 'sk_test_J3frjen7dRfbwqLLakiVfcsF00cMHZ632H',
});

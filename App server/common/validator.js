const Validator = require('validatorjs');
const Promise = require('bluebird');

function getDefaultMessages() {
  return {
    required: 'Field required',
    regex: 'Invalid format',
  };
}

// Configuration
Validator.useLang('en');

Validator.setAttributeFormatter(
  (attribute) => attribute.charAt(0).toUpperCase() + attribute.slice(1),
);

// Custom functions
Validator.generate = (data, parms) => {
  const v = new Validator(data, parms.rules, parms.messages);
  // v.setAttributeNames(parms.titles)
  // v.stopOnError(true)
  return v;
};

Validator.firstError = (validator) => {
  // console.log(validator.errors.all());
  const firstAttribute = Object.keys(validator.errors.all()).shift();
  return validator.errors.first(firstAttribute);
};

Validator.firstByField = (validator) => {
  const errors = validator.errors.all();
  Object.keys(errors).forEach((key) => {
    const keyIndex = 0;
    errors[key] = errors[key][keyIndex];
  });

  return errors;
};

Validator.validateAsync = (data, parms, returnAll = true) =>
  new Promise((resolve) => {
    const messages = Object.assign(getDefaultMessages(), parms.messages);
    const v = new Validator(data, parms.rules, messages);
    v.checkAsync(
      () => resolve(true),
      () => resolve(returnAll ? Validator.firstByField(v) : Validator.firstError(v)),
    );
  });

module.exports = Validator;

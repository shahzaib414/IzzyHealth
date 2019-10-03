class IzzyFieldErrors extends Error {
  constructor(message, fields) {
    super(message);
    this.name = this.constructor.name;
    this.fields = fields;
  }
}
IzzyFieldErrors.ERROR_MESSAGES = {
  MISSING_FIELD: 'MISSING_FIELD',
  INVALID_EMAIL: 'INVALID_EMAIL',
};
module.exports = IzzyFieldErrors;

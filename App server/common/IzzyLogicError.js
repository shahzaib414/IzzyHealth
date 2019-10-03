class IzzyLogicError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
  }
}

IzzyLogicError.ERROR_MESSAGES = {
  NOT_FOUND: 'NOT_FOUND',
  OPERATION_FAILED: 'OPERATION_FAILED',
};

module.exports = IzzyLogicError;

function RequestEmulator(requestPayload) {
  this.request = requestPayload;
  this.response = {
    json: (responsePayload) => ({ response: responsePayload }),
  };

  this.getResponse = async (handler) => {
    const response = await handler(this.request, this.response);

    return response;
  };

  this.isNextExecuted = async (middleware) => {
    const next = () => {
      return true;
    };

    const isExecuted = await middleware(this.request, this.response, next);

    return isExecuted;
  };
}

module.exports = RequestEmulator;

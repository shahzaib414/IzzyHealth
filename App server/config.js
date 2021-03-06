/* eslint-disable no-console */

const express = require('express');
const IzzyLogicError = require('./common/IzzyLogicError');
const IzzyFieldErrors = require('./common/IzzyFieldErrors');

express.request.only = function only() {
  const data = {};

  for (let i = 0; i < arguments.length; i += 1) {
    data[arguments[i]] = this.body[arguments[i]]; // eslint-disable-line prefer-rest-params
  }

  return data;
};

express.response.error = function handleError(error, status = 403, path) {
  // Change response on case of check token path
  if (path === '/auth/check') {
    return this.json({ isValid: false });
  }
  return this.status(status).json({ error });
};

express.response.errorValidation = function handleErrorValidation(error, status = 403) {
  return this.status(status).json({ validation: error });
};

express.response.notFound = function handleErrorNotFound() {
  return this.status(404).json({ error: 'Resource not found' });
};

express.response.handleReject = function handleReject(err) {
  if (err instanceof IzzyFieldErrors) {
    return this.errorValidation(err.fields);
  }

  if (err instanceof IzzyLogicError) {
    switch (err.message) {
      case 'NOT_FOUND':
        return this.notFound();
      default:
        return this.error(err.message);
    }
  }

  console.log('\x1b[41m', '=ERROR====', err);
  console.log('\x1b[0m');

  return this.error('An error ocurred', 500);
};

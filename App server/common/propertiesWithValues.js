const propertiesWithValues = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') propertiesWithValues(obj[key]);
    // eslint-disable-next-line no-param-reassign
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

module.exports = propertiesWithValues;

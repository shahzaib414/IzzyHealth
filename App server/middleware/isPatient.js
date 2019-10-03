const isPatient = (req, res, next) => {
  if (req.userType && req.userType !== 'patient') {
    return res.status(401).send({ error: 'Access denied' });
  }
  return next();
};

module.exports = isPatient;

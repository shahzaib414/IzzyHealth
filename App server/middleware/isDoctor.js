const isDoctor = (req, res, next) => {
  if (req.userType && req.userType !== 'doctor') {
    return res.status(401).send({ error: 'Access denied' });
  }
  return next();
};

module.exports = isDoctor;

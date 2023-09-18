const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, keys.secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

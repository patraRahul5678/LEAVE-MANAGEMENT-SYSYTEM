const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = (requiredRole) => async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ msg: 'User not found' });
    if (requiredRole && req.user.role !== requiredRole) return res.status(403).json({ msg: 'Forbidden' });
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
module.exports = auth;

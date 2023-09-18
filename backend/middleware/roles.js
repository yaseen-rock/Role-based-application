module.exports = (roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      console.log(`User role: ${req.user.role}`);
      next();
    } else {
      console.log(`Access denied. User role: ${req.user ? req.user.role : 'undefined'}`);
      return res.status(403).json({ message: 'Access denied' });
    }
  };
};

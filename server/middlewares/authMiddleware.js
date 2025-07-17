function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'You must be logged in to add to cart' });
}

module.exports = { ensureAuth };

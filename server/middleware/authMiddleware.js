//server/middleware/authMiddleware.js is the Security Guard of your application. It stands at the entrance of private routes (like "Profile" or "Checkout"). It intercepts requests, checks if the user is carrying a valid "ID Badge" (the JWT cookie), and decodes it to verify their identity. If the badge is missing or fake, it blocks entry; if valid, it allows the user to pass.


// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user info to request object (excluding password)
      req.user = await User.findById(decoded.userId).select('-password');

      next(); // Move to the next middleware/controller
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
//server/routes/userRoutes.js is the Traffic Director for user-related requests. It maps specific URLs (like /login or /profile) to the correct Controller functions. It also decides which routes require the Security Guard (Middleware) and which are open to the public.

// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

// Protected Routes (require login)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
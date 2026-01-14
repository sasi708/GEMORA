//Logistics Manager. It maps the checkout-related URLs to the Order Controller.

//Important: All these routes use protect. This means a user must be logged in to place an order, pay for it, or view their past purchases.

// server/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

module.exports = router;
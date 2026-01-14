//Catalog Director. It maps URLs to the Product Controller.

//Public Routes: Anyone can visit /api/products (to see the list) or /api/products/:id (to see details).

//Protected Routes: Only logged-in users (with a valid token) can Create, Update, or Delete products.


const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes (View all or one)
router.route('/').get(getProducts).post(protect, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
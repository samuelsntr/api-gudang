const express = require('express');
const router = express.Router();
const controllers = require('../controllers/returPenjualanController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Route Penjualan
router.get('/', isAuthenticated, controllers.getAllReturPenjualan);
router.post('/', isAuthenticated, isAdmin, controllers.createReturPenjualan);

module.exports = router;

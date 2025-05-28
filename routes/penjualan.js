const express = require('express');
const router = express.Router();
const penjualanController = require('../controllers/penjualanController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Route Penjualan
router.get('/', isAuthenticated, penjualanController.getAllPenjualan);
router.get('/:id', isAuthenticated, penjualanController.getTotalTagihan);
router.put('/:id', isAuthenticated, isAdmin, penjualanController.updatePenjualan);
router.post('/', isAuthenticated, isAdmin, penjualanController.createPenjualan);
router.delete('/:id', isAuthenticated, isAdmin, penjualanController.deletePenjualan);

module.exports = router;

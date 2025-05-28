const express = require('express');
const router = express.Router();
const pembelianController = require('../controllers/pembelianController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Route Pembelian CRUD
router.get('/', isAuthenticated, pembelianController.getAllPembelian);
router.get('/:id', isAuthenticated, pembelianController.getPembelianById);
router.post('/', isAuthenticated, isAdmin, pembelianController.createPembelian);
router.delete('/:id', isAuthenticated, isAdmin, pembelianController.deletePembelian);

module.exports = router;

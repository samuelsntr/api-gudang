const express = require('express');
const router = express.Router();
const produksiController = require('../controllers/produksiController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Route Produksi
router.get('/', isAuthenticated, produksiController.getAllProduksi);
router.get('/:id', isAuthenticated, produksiController.getProduksiById);
router.post('/', isAuthenticated, isAdmin, produksiController.createProduksi);
router.delete('/:id', isAuthenticated, isAdmin, produksiController.deleteProduksi);

module.exports = router;

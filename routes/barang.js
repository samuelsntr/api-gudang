const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Route Barang CRUD
router.get('/', isAuthenticated, barangController.getAllBarang);
router.get('/:id', isAuthenticated, barangController.getBarangById);
router.post('/', isAuthenticated, isAdmin, barangController.createBarang);
router.put('/:id', isAuthenticated, isAdmin, barangController.updateBarang);
router.delete('/:id', isAuthenticated, isAdmin, barangController.deleteBarang);

module.exports = router;

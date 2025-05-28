const express = require('express');
const router = express.Router();
const hargaKhususController = require('../controllers/hargaKhususController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Route Pembelian CRUD
router.get('/', isAuthenticated, hargaKhususController.getAllHargaKhusus);
router.get('/harga', isAuthenticated, hargaKhususController.getHargaKhususByBarangAndKonsumen);
router.post('/', isAuthenticated, isAdmin, hargaKhususController.createHargaKhusus);
router.put('/:id', isAuthenticated, isAdmin, hargaKhususController.updateHargaKhusus);
router.delete('/:id', isAuthenticated, isAdmin, hargaKhususController.deleteHargaKhusus);

module.exports = router;

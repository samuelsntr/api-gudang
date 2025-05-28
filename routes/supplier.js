const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Route Supplier CRUD
router.get('/', isAuthenticated, supplierController.getAllSupplier);
router.get('/:id', isAuthenticated, supplierController.getSupplierById);
router.post('/', isAuthenticated, isAdmin, supplierController.createSupplier);
router.put('/:id', isAuthenticated, isAdmin, supplierController.updateSupplier);
router.delete('/:id', isAuthenticated, isAdmin, supplierController.deleteSupplier);

module.exports = router;

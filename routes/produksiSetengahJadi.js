const express = require('express');
const router = express.Router();
const controllers = require("../controllers/produksiSetengahJadiController")
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Route Pembelian CRUD
router.get('/', isAuthenticated, controllers.getAll);
router.post('/', isAuthenticated, isAdmin, controllers.create);
router.delete('/:id', isAuthenticated, isAdmin, controllers.delete);

module.exports = router;
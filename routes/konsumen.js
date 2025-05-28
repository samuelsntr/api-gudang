const express = require('express');
const router = express.Router();
const konsumenController = require('../controllers/konsumenController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Route Konsumen CRUD
router.get('/', isAuthenticated, konsumenController.getAllKonsumen);
router.get('/:id', isAuthenticated, konsumenController.getKonsumenById);
router.post('/', isAuthenticated, isAdmin, konsumenController.createKonsumen);
router.put('/:id', isAuthenticated, isAdmin, konsumenController.updateKonsumen);
router.delete('/:id', isAuthenticated, isAdmin, konsumenController.deleteKonsumen);

module.exports = router;

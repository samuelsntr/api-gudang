const express = require("express");
const router = express.Router();
const laporanController = require("../controllers/laporanController");
const { isAuthenticated } = require("../middleware/auth");

// Route Laporan Summary
router.get('/summary', isAuthenticated, laporanController.getLaporanSummary);
router.get('/penjualan-bulanan', isAuthenticated, laporanController.getPenjualanBulanan);
router.get('/entitas-summary', isAuthenticated, laporanController.getEntitasSummary);
router.get('/outstanding', isAuthenticated, laporanController.getOutstandingPayments);
router.get('/penjualan-konsumen', isAuthenticated, laporanController.getPenjualanPerKonsumen);
router.get('/stock', isAuthenticated, laporanController.getLaporanStock);
router.get('/neraca', isAuthenticated, laporanController.getLaporanNeraca);
router.get("/summary", isAuthenticated, laporanController.getLaporanSummary);
router.get("/laba-konsumen", isAuthenticated, laporanController.getLabaPerKonsumen);
router.get("/arus-kas", isAuthenticated, laporanController.getLaporanArusKas);

module.exports = router;

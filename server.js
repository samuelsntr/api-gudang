const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const pembelianRoutes = require("./routes/pembelian");
const barangRoutes = require("./routes/barang");
const supplierRoutes = require("./routes/supplier");
const produksiRoutes = require("./routes/produksi");
const penjualanRoutes = require("./routes/penjualan");
const laporanRoutes = require("./routes/laporan");
const produksiSetengahJadiRoutes = require("./routes/produksiSetengahJadi");
const konsumenRoutes = require("./routes/konsumen");
const hargaKhususRoutes = require("./routes/hargaKhusus");
const userRoutes = require("./routes/user");
const returPenjualanRoutes = require("./routes/returPenjualan");

const db = require("./models");

const app = express();

// Konfigurasi express-session
app.use(
  session({
    secret: "your-secret-key", // Ganti dengan string acak yang kuat
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Jika menggunakan HTTPS, set secure: true
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// AUTH ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/pembelian", pembelianRoutes);
app.use("/api/barang", barangRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/produksi", produksiRoutes);
app.use("/api/penjualan", penjualanRoutes);
app.use("/api/laporan", laporanRoutes);
app.use("/api/produksi-setengah-jadi", produksiSetengahJadiRoutes);
app.use("/api/konsumen", konsumenRoutes);
app.use("/api/harga-khusus", hargaKhususRoutes);
app.use("/api/user", userRoutes);
app.use("/api/retur", returPenjualanRoutes);

// Test route
app.get("/", (req, res) => res.send("Gudang management API running"));

// // Connect to DB and sync
db.sequelize.sync({ alter: false }).then(() => {
  console.log("Database connected and tables synced!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

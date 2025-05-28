const {
  Penjualan,
  Produksi,
  Pembelian,
  Barang,
  Supplier,
  User,
  BarangSetengahJadiProduksi,
  Konsumen,
  PenjualanDetail,
  ReturPenjualan
} = require("../models");
const { Op, Sequelize } = require("sequelize");

exports.getLaporanSummary = async (req, res) => {
  try {
    const { tanggalAwal, tanggalAkhir } = req.query;

    const whereClause = {};

    if (tanggalAwal && tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);
      whereClause.tanggal = {
        [Op.gte]: new Date(tanggalAwal),
        [Op.lt]: akhir,
      };
    } else if (tanggalAwal) {
      whereClause.tanggal = { [Op.gte]: new Date(tanggalAwal) };
    } else if (tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);
      whereClause.tanggal = { [Op.lt]: akhir };
    }

    const [totalPenjualan, jumlahTransaksi] = await Promise.all([
      Penjualan.sum("total", { where: whereClause }),
      Penjualan.count({ where: whereClause }),
    ]);

    const [totalRetur] = await Promise.all([
      ReturPenjualan.sum("total", { where: whereClause }),
    ]);

    const [totalHPPProduksi, jumlahProduksi] = await Promise.all([
      Produksi.sum("total_hpp", { where: whereClause }),
      Produksi.count({ where: whereClause }),
    ]);

    const [totalHPPSetengahJadi, jumlahProduksiSetengahJadi] =
      await Promise.all([
        BarangSetengahJadiProduksi.sum("total_hpp", { where: whereClause }),
        BarangSetengahJadiProduksi.count({ where: whereClause }),
      ]);

    const totalHPP = (totalHPPProduksi || 0) + (totalHPPSetengahJadi || 0);
    const totalProduksi = jumlahProduksi + jumlahProduksiSetengahJadi;
    const totalPembelian =
      (await Pembelian.sum("total", { where: whereClause })) || 0;

    const totalPenjualanBersih =
      (totalPenjualan || 0) - (totalRetur || 0);

    const labaKotor = totalPenjualanBersih - totalHPP;

    res.json({
      totalPenjualan: totalPenjualan || 0,
      totalRetur: totalRetur || 0,
      totalPenjualanBersih,
      jumlahTransaksi,
      totalHPP,
      jumlahProduksi: totalProduksi,
      totalPembelian,
      labaKotor,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil laporan summary",
      error: err.message,
    });
  }
};

// GET Penjualan Bulanan + Pembelian + Produksi
exports.getPenjualanBulanan = async (req, res) => {
  try {
    const { tahun } = req.query;
    const selectedYear = tahun ? parseInt(tahun) : new Date().getFullYear();

    const penjualanBulanan = await Penjualan.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("tanggal")), "bulan"],
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalPenjualan"],
      ],
      where: Sequelize.where(
        Sequelize.fn("YEAR", Sequelize.col("tanggal")),
        selectedYear
      ),
      group: [Sequelize.fn("MONTH", Sequelize.col("tanggal"))],
    });

    const returBulanan = await ReturPenjualan.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("tanggal")), "bulan"],
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalRetur"],
      ],
      where: Sequelize.where(
        Sequelize.fn("YEAR", Sequelize.col("tanggal")),
        selectedYear
      ),
      group: [Sequelize.fn("MONTH", Sequelize.col("tanggal"))],
    });

    const pembelianBulanan = await Pembelian.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("tanggal")), "bulan"],
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalPembelian"],
      ],
      where: Sequelize.where(
        Sequelize.fn("YEAR", Sequelize.col("tanggal")),
        selectedYear
      ),
      group: [Sequelize.fn("MONTH", Sequelize.col("tanggal"))],
    });

    const produksiBulanan = await Produksi.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("tanggal")), "bulan"],
        [Sequelize.fn("SUM", Sequelize.col("total_hpp")), "totalHPPJadi"],
      ],
      where: Sequelize.where(
        Sequelize.fn("YEAR", Sequelize.col("tanggal")),
        selectedYear
      ),
      group: [Sequelize.fn("MONTH", Sequelize.col("tanggal"))],
    });

    const setengahJadiBulanan = await BarangSetengahJadiProduksi.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("tanggal")), "bulan"],
        [
          Sequelize.fn("SUM", Sequelize.col("total_hpp")),
          "totalHPPSetengahJadi",
        ],
      ],
      where: Sequelize.where(
        Sequelize.fn("YEAR", Sequelize.col("tanggal")),
        selectedYear
      ),
      group: [Sequelize.fn("MONTH", Sequelize.col("tanggal"))],
    });

    const data = Array.from({ length: 12 }, (_, index) => {
      const bulan = index + 1;

      const penjualan = penjualanBulanan.find((d) => d.get("bulan") == bulan);
      const retur = returBulanan.find((d) => d.get("bulan") == bulan);
      const pembelian = pembelianBulanan.find((d) => d.get("bulan") == bulan);
      const produksiJadi = produksiBulanan.find((d) => d.get("bulan") == bulan);
      const produksiSetengah = setengahJadiBulanan.find(
        (d) => d.get("bulan") == bulan
      );

      const totalPenjualan = Math.max(
        (penjualan ? parseFloat(penjualan.get("totalPenjualan")) : 0) -
          (retur ? parseFloat(retur.get("totalRetur")) : 0),
        0
      );

      const totalPembelian = pembelian
        ? parseFloat(pembelian.get("totalPembelian"))
        : 0;

      const totalHPPJadi = produksiJadi
        ? parseFloat(produksiJadi.get("totalHPPJadi"))
        : 0;
      const totalHPPSetengah = produksiSetengah
        ? parseFloat(produksiSetengah.get("totalHPPSetengahJadi"))
        : 0;

      const totalHPP = totalHPPJadi + totalHPPSetengah;
      const laba = totalPenjualan - totalHPP;

      return {
        bulan,
        totalPenjualan,
        totalPembelian,
        totalHPP,
        laba,
      };
    });

    res.json(data);
  } catch (err) {
    console.error("Error getPenjualanBulanan:", err);
    res.status(500).json({
      message: "Gagal mengambil data penjualan bulanan",
      error: err.message,
    });
  }
};

exports.getEntitasSummary = async (req, res) => {
  try {
    const jumlahBarang = await Barang.count();
    const jumlahSupplier = await Supplier.count();
    const jumlahUser = await User.count();
    const jumlahKonsumen = await Konsumen.count();

    res.json({ jumlahBarang, jumlahSupplier, jumlahUser, jumlahKonsumen });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data entitas", error: error.message });
  }
};

exports.getOutstandingPayments = async (req, res) => {
  try {
    const { tanggalAwal, tanggalAkhir } = req.query;

    const whereClause = {
      status_pembayaran: "hutang",
    };

    if (tanggalAwal && tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);

      whereClause.tanggal = {
        [Op.gte]: new Date(tanggalAwal),
        [Op.lt]: akhir,
      };
    } else if (tanggalAwal) {
      whereClause.tanggal = {
        [Op.gte]: new Date(tanggalAwal),
      };
    } else if (tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);

      whereClause.tanggal = {
        [Op.lt]: akhir,
      };
    }

    // Ambil semua penjualan hutang
    const penjualans = await Penjualan.findAll({
      where: whereClause,
      include: [{ model: Konsumen }],
      order: [["tanggal", "DESC"]],
    });

    // Untuk setiap penjualan, hitung total retur-nya dan kurangi dari total
    const data = await Promise.all(
      penjualans.map(async (penjualan) => {
        const totalRetur = await ReturPenjualan.sum("total", {
          where: { penjualanId: penjualan.id },
        });

        const totalBersih = (penjualan.total || 0) - (totalRetur || 0);

        return {
          ...penjualan.toJSON(),
          totalBersih,
        };
      })
    );

    const totalOutstanding = data.reduce((acc, p) => acc + p.totalBersih, 0);

    res.json({
      totalOutstanding,
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil data outstanding",
      error: err.message,
    });
  }
};


exports.getPenjualanPerKonsumen = async (req, res) => {
  try {
    const { tanggalAwal, tanggalAkhir } = req.query;
    const whereClause = {};

    if (tanggalAwal && tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);
      whereClause.tanggal = {
        [Op.gte]: new Date(tanggalAwal),
        [Op.lt]: akhir,
      };
    } else if (tanggalAwal) {
      whereClause.tanggal = {
        [Op.gte]: new Date(tanggalAwal),
      };
    } else if (tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);
      whereClause.tanggal = {
        [Op.lt]: akhir,
      };
    }

    // Ambil total penjualan per konsumen
    const penjualanData = await Penjualan.findAll({
      attributes: [
        "konsumenId",
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalPenjualan"],
      ],
      where: whereClause,
      include: [{ model: Konsumen, attributes: ["nama"] }],
      group: ["konsumenId", "Konsumen.id"],
    });

    // Hitung total retur per konsumen
    const returData = await ReturPenjualan.findAll({
      attributes: [
        "konsumenId",
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalRetur"],
      ],
      where: whereClause,
      group: ["konsumenId"],
      raw: true,
    });

    const returMap = {};
    returData.forEach((r) => {
      returMap[r.konsumenId] = parseFloat(r.totalRetur || 0);
    });

    // Gabungkan hasil dan hitung penjualan bersih
    const result = penjualanData.map((p) => {
      const totalPenjualan = parseFloat(p.get("totalPenjualan") || 0);
      const totalRetur = returMap[p.konsumenId] || 0;
      const totalBersih = totalPenjualan - totalRetur;

      return {
        konsumenId: p.konsumenId,
        nama: p.Konsumen?.nama || "-",
        totalPenjualan,
        totalRetur,
        totalBersih,
      };
    });

    // Urutkan berdasarkan total bersih
    result.sort((a, b) => b.totalBersih - a.totalBersih);

    res.json(result);
  } catch (error) {
    console.error("Gagal mengambil laporan penjualan per konsumen:", error);
    res.status(500).json({
      message: "Gagal mengambil laporan penjualan per konsumen",
      error: error.message,
    });
  }
};

// GET Laporan Stok Barang
exports.getLaporanStock = async (req, res) => {
  try {
    const { jenis } = req.query;

    const whereClause = {};

    if (jenis && jenis !== "all") {
      whereClause.jenis = jenis;
    }

    const barangs = await Barang.findAll({
      where: whereClause,
      attributes: [
        "id",
        "nama",
        "stok",
        "jenis",
        "satuan",
        "hpp",
        [Sequelize.literal("stok * hpp"), "totalNilai"],
      ],
      order: [["nama", "ASC"]],
    });

    res.json(barangs);
  } catch (err) {
    console.error("Gagal mengambil laporan stok:", err);
    res.status(500).json({
      message: "Gagal mengambil laporan stok",
      error: err.message,
    });
  }
};

exports.getLaporanNeraca = async (req, res) => {
  try {
    const { tanggalAkhir } = req.query;
    const tanggal = tanggalAkhir ? new Date(tanggalAkhir) : new Date();
    tanggal.setDate(tanggal.getDate() + 1); // include tanggal akhir

    // 1. Aktiva: Total nilai stok barang
    const stokAktiva = await Barang.findAll({
      attributes: [
        'id',
        'nama',
        'stok',
        'hpp',
        [Sequelize.literal('stok * hpp'), 'totalNilai']
      ]
    });

    const totalAktiva = stokAktiva.reduce(
      (sum, item) => sum + parseFloat(item.get('totalNilai') || 0),
      0
    );

    // 2. Liabilitas: Penjualan belum lunas (piutang)
    const penjualanHutang = await Penjualan.findAll({
      where: {
        status_pembayaran: 'hutang',
        tanggal: {
          [Op.lt]: tanggal,
        },
      },
      attributes: ['id', 'total'],
    });

    const penjualanIds = penjualanHutang.map(p => p.id);
    const totalPenjualanHutang = penjualanHutang.reduce(
      (sum, p) => sum + parseFloat(p.total || 0),
      0
    );

    // 3. Total retur dari penjualan yang statusnya hutang
    const totalReturHutang = await ReturPenjualan.sum('total', {
      where: {
        penjualanId: {
          [Op.in]: penjualanIds,
        },
        tanggal: {
          [Op.lt]: tanggal,
        },
      },
    });

    const totalLiabilitas = totalPenjualanHutang - (totalReturHutang || 0);

    // 4. Ekuitas = Aktiva - Liabilitas
    const ekuitas = totalAktiva - totalLiabilitas;

    res.json({
      totalAktiva,
      totalLiabilitas,
      totalEkuitas: ekuitas,
    });

  } catch (err) {
    console.error('Gagal mengambil laporan neraca:', err);
    res.status(500).json({
      message: 'Gagal mengambil laporan neraca',
      error: err.message,
    });
  }
};

exports.getLabaPerKonsumen = async (req, res) => {
  try {
    const { bulan, tahun } = req.query;

    if (!bulan || !tahun) {
      return res.status(400).json({ message: "Bulan dan tahun wajib diisi." });
    }

    // DETAIL LABA PER PRODUK
    const detailData = await Penjualan.findAll({
      attributes: [
        "konsumenId",
        [Sequelize.col("Konsumen.nama"), "konsumen"],
        [Sequelize.col("PenjualanDetails.Barang.nama"), "produk"],
        [
          Sequelize.literal(
            "SUM(PenjualanDetails.qty * PenjualanDetails.harga)"
          ),
          "totalPenjualan",
        ],
        [
          Sequelize.literal(
            "SUM(PenjualanDetails.qty * `PenjualanDetails->Barang`.hpp)"
          ),
          "totalHPP",
        ],
        [
          Sequelize.literal(
            "SUM((PenjualanDetails.qty * PenjualanDetails.harga) - (PenjualanDetails.qty * `PenjualanDetails->Barang`.hpp))"
          ),
          "laba",
        ],
      ],
      include: [
        {
          model: Konsumen,
          attributes: [],
        },
        {
          model: PenjualanDetail,
          attributes: [],
          include: [{ model: Barang, attributes: [] }],
        },
      ],
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("Penjualan.tanggal")),
            parseInt(bulan)
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("Penjualan.tanggal")),
            parseInt(tahun)
          ),
        ],
      },
      group: ["konsumenId", "PenjualanDetails.Barang.id"],
      raw: true,
    });

    // RETUR PER KONSUMEN
    const returData = await ReturPenjualan.findAll({
      attributes: [
        "konsumenId",
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalRetur"]
      ],
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("tanggal")),
            parseInt(bulan)
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("tanggal")),
            parseInt(tahun)
          ),
        ]
      },
      include: [
        {
          model: Konsumen,
          attributes: ["nama"],
        },
      ],
      group: ["konsumenId", "Konsumen.id"],
      raw: true,
    });

    const returMap = {};
    returData.forEach(item => {
      returMap[item.konsumenId] = parseFloat(item.totalRetur || 0);
    });

    // REKAP
    const rekapData = {};

    detailData.forEach((item) => {
      const key = item.konsumen;
      const retur = returMap[item.konsumenId] || 0;

      if (!rekapData[key]) {
        rekapData[key] = {
          konsumen: item.konsumen,
          totalPenjualan: 0,
          totalHPP: 0,
          totalRetur: retur, // default
          laba: 0,
        };
      }

      rekapData[key].totalPenjualan += parseFloat(item.totalPenjualan);
      rekapData[key].totalHPP += parseFloat(item.totalHPP);
      rekapData[key].laba += parseFloat(item.laba);
    });

    // Kurangi laba dengan retur
    Object.values(rekapData).forEach(item => {
      item.totalPenjualan -= item.totalRetur;
      item.laba -= item.totalRetur;
    });

    res.json({
      detail: detailData,
      rekap: Object.values(rekapData),
    });

  } catch (err) {
    console.error("Gagal mengambil laba per konsumen:", err);
    res.status(500).json({
      message: "Gagal mengambil laba per konsumen",
      error: err.message,
    });
  }
};

exports.getLaporanArusKas = async (req, res) => {
  try {
    const { tanggalAwal, tanggalAkhir } = req.query;

    const whereClause = {};
    if (tanggalAwal && tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);
      whereClause.tanggal = {
        [Op.gte]: new Date(tanggalAwal),
        [Op.lt]: akhir,
      };
    } else if (tanggalAwal) {
      whereClause.tanggal = {
        [Op.gte]: new Date(tanggalAwal),
      };
    } else if (tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);
      whereClause.tanggal = {
        [Op.lt]: akhir,
      };
    }

    // Pemasukan: hanya penjualan lunas
    const pemasukan = await Penjualan.sum("total", {
      where: {
        ...whereClause,
        status_pembayaran: "lunas",
      },
    });

    // Retur penjualan (pengurang pemasukan)
    const totalRetur = await ReturPenjualan.sum("total", {
      where: whereClause,
    });

    // Pengeluaran: pembelian dan produksi
    const pembelian = await Pembelian.sum("total", { where: whereClause });
    const produksi = await Produksi.sum("total_hpp", { where: whereClause });

    // Final perhitungan
    const totalPemasukan = (pemasukan || 0) - (totalRetur || 0);
    const totalPengeluaran = (pembelian || 0) + (produksi || 0);
    const saldo = totalPemasukan - totalPengeluaran;

    res.json({
      totalPemasukan,
      totalPengeluaran,
      saldo,
      rincian: {
        pemasukan: pemasukan || 0,
        retur: totalRetur || 0,
        pembelian: pembelian || 0,
        produksi: produksi || 0,
      },
    });
  } catch (err) {
    console.error("Gagal mengambil laporan arus kas:", err);
    res.status(500).json({
      message: "Gagal mengambil laporan arus kas",
      error: err.message,
    });
  }
};


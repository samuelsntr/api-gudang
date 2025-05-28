const { Penjualan, PenjualanDetail, Barang, Konsumen, ReturPenjualan } = require('../models');
const { sequelize } = require('../models');
const { Op } = require("sequelize");

// GET Semua Penjualan
exports.getAllPenjualan = async (req, res) => {
  try {
    const { tanggalAwal, tanggalAkhir, search, status } = req.query;
    const whereClause = {};

    if (tanggalAwal && tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);

      whereClause.tanggal = {
        [Op.gte]: new Date(tanggalAwal),
        [Op.lt]: akhir,
      };
    }

    if (status && status !== "all") {
      whereClause.status_pembayaran = status;
    }

    const penjualans = await Penjualan.findAll({
      where: whereClause,
      include: [
        {
          model: PenjualanDetail,
          include: [
            {
              model: Barang,
              attributes: ["id", "nama"],
            },
          ],
        },
        {
          model: Konsumen,
          as: "Konsumen",
          attributes: ["id", "nama"],
        },
      ],
      ...(search && {
        // global filter: search Barang.nama OR Konsumen.nama
        where: {
          ...whereClause,
          [Op.or]: [
            { "$PenjualanDetails.Barang.nama$": { [Op.like]: `%${search}%` } },
            { "$Konsumen.nama$": { [Op.like]: `%${search}%` } },
          ],
        },
        subQuery: false,
      }),
      order: [["createdAt", "DESC"]],
    });

    res.json(penjualans);
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil data penjualan",
      error: err.message,
    });
  }
};

// GET Penjualan berdasarkan ID
exports.getPenjualanById = async (req, res) => {
  try {
    const penjualan = await Penjualan.findByPk(req.params.id, {
      include: [
        {
          model: PenjualanDetail,
          include: [Barang],
        },
      ],
    });

    if (!penjualan) {
      return res.status(404).json({ message: 'Penjualan tidak ditemukan' });
    }

    res.json(penjualan);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil penjualan', error: err.message });
  }
};

// POST Tambah Penjualan
exports.createPenjualan = async (req, res) => {
  const {
    tanggal,
    konsumenId,
    status_pembayaran,
    metode_pembayaran,
    keterangan,
    items,
  } = req.body;

  const t = await sequelize.transaction();

  try {
    let total = 0;

    // Hitung total terlebih dahulu
    for (const item of items) {
      if (!item.qty || !item.harga) {
        throw new Error("Item penjualan harus memiliki qty dan harga.");
      }
      total += item.qty * item.harga;
    }

    // Buat data penjualan utama
    const penjualan = await Penjualan.create({
      tanggal: tanggal ? new Date(tanggal) : new Date(),
      konsumenId: konsumenId || null,
      status_pembayaran: status_pembayaran || "lunas", // default
      metode_pembayaran: metode_pembayaran || "cash", // default
      total,
      keterangan,
    }, { transaction: t });

    // Simpan semua item detail dan kurangi stok
    for (const item of items) {
      const barang = await Barang.findByPk(item.barangId, { transaction: t });

      if (!barang || barang.stok < item.qty) {
        throw new Error(`Stok tidak cukup untuk barang: ${barang?.nama || item.barangId}`);
      }

      // Kurangi stok
      barang.stok -= item.qty;
      await barang.save({ transaction: t });

      await PenjualanDetail.create({
        penjualanId: penjualan.id,
        barangId: item.barangId,
        qty: item.qty,
        harga: item.harga,
        subtotal: item.qty * item.harga,
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json({ message: 'Penjualan berhasil disimpan', penjualan });

  } catch (err) {
    await t.rollback();
    console.error("Gagal simpan penjualan:", err.message);
    res.status(500).json({ message: 'Gagal menyimpan penjualan', error: err.message });
  }
};

// PUT /penjualan/:id - Update tanggal, status pembayaran, dan keterangan
exports.updatePenjualan = async (req, res) => {
  try {
    const { id } = req.params;
    const { tanggal, status_pembayaran, metode_pembayaran, keterangan } = req.body;

    if (!["lunas", "hutang"].includes(status_pembayaran)) {
      return res.status(400).json({ message: "Status pembayaran tidak valid (harus 'lunas' atau 'hutang')" });
    }

    const penjualan = await Penjualan.findByPk(id);
    if (!penjualan) {
      return res.status(404).json({ message: "Penjualan tidak ditemukan" });
    }

    penjualan.tanggal = tanggal ? new Date(tanggal) : penjualan.tanggal;
    penjualan.status_pembayaran = status_pembayaran;
    penjualan.metode_pembayaran = metode_pembayaran;
    penjualan.keterangan = keterangan || null;

    await penjualan.save();

    res.json({ message: "Data penjualan berhasil diperbarui", penjualan });
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui data penjualan", error: err.message });
  }
};

// DELETE Penjualan
exports.deletePenjualan = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const penjualan = await Penjualan.findByPk(req.params.id, {
      include: [PenjualanDetail],
      transaction: t
    });

    if (!penjualan) {
      return res.status(404).json({ message: 'Penjualan tidak ditemukan' });
    }

    // Kembalikan stok barang
    for (const detail of penjualan.PenjualanDetails) {
      const barang = await Barang.findByPk(detail.barangId, { transaction: t });
      if (barang) {
        barang.stok += detail.qty;
        await barang.save({ transaction: t });
      }
    }

    await PenjualanDetail.destroy({ where: { penjualanId: penjualan.id }, transaction: t });
    await penjualan.destroy({ transaction: t });

    await t.commit();
    res.json({ message: 'Penjualan berhasil dihapus' });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: 'Gagal menghapus penjualan', error: err.message });
  }
};

// GET Total tagihan bersih per penjualan
exports.getTotalTagihan = async (req, res) => {
  const { id } = req.params; // penjualanId

  try {
    const penjualan = await Penjualan.findByPk(id);
    if (!penjualan) {
      return res.status(404).json({ message: "Penjualan tidak ditemukan" });
    }

    const totalRetur = await ReturPenjualan.sum('total', {
      where: { penjualanId: id },
    });

    const totalTagihan = parseFloat(penjualan.total) - parseFloat(totalRetur || 0);

    res.json({
      penjualanId: id,
      totalPenjualan: penjualan.total,
      totalRetur: totalRetur || 0,
      totalTagihan,
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil tagihan", error: err.message });
  }
};


const { Pembelian, PembelianDetail, Barang, Supplier } = require('../models');
const { sequelize } = require('../models');
const { Op } = require("sequelize");

// GET Semua Pembelian dengan filter nama & tanggal
exports.getAllPembelian = async (req, res) => {
  try {
    const { search, tanggalAwal, tanggalAkhir } = req.query;

    const wherePembelian = {};
    const whereSupplier = {};

    // Filter tanggal (pastikan data tanggal akhir juga tercover)
    if (tanggalAwal && tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1); // tambahkan 1 hari agar inklusif
      wherePembelian.tanggal = { [Op.gte]: new Date(tanggalAwal), [Op.lt]: akhir };
    } else if (tanggalAwal) {
      wherePembelian.tanggal = { [Op.gte]: new Date(tanggalAwal) };
    } else if (tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);
      wherePembelian.tanggal = { [Op.lt]: akhir };
    }

    // Filter nama supplier
    if (search) {
      whereSupplier.nama = { [Op.like]: `%${search}%` };
    }

    const pembelians = await Pembelian.findAll({
      where: wherePembelian,
      include: [
        {
          model: Supplier,
          attributes: ['id', 'nama'],
          where: search ? whereSupplier : undefined,
        },
        {
          model: PembelianDetail,
          include: [Barang],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(pembelians);
  } catch (err) {
    res.status(500).json({
      message: 'Gagal mengambil data pembelian',
      error: err.message,
    });
  }
};

// GET Pembelian berdasarkan ID
exports.getPembelianById = async (req, res) => {
  try {
    const pembelian = await Pembelian.findByPk(req.params.id, {
      include: [
        {
          model: PembelianDetail,
          include: [Barang],
        },
      ],
    });
    if (!pembelian) {
      return res.status(404).json({ message: 'Pembelian tidak ditemukan' });
    }
    res.json(pembelian);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil pembelian', error: err.message });
  }
};

// POST Tambah Pembelian
exports.createPembelian = async (req, res) => {
  const { supplierId, items } = req.body;
  const t = await sequelize.transaction();

  try {
    const pembelian = await Pembelian.create({
      supplierId,
      tanggal: new Date(),
      total: 0,
    }, { transaction: t });

    let totalPembelian = 0;

    for (const item of items) {
      const { barangId, qty, harga } = item;

      const barang = await Barang.findByPk(barangId, { transaction: t });
      if (!barang) {
        throw new Error(`Barang dengan ID ${barangId} tidak ditemukan`);
      }

      const subtotal = harga * qty;
      totalPembelian += subtotal;

      // Update stok barang - menambah stok sesuai qty yang dibeli
      const stokBaru = Number(barang.stok) + Number(qty);
      barang.stok = stokBaru;
      barang.harga_beli = harga; // Update harga beli terbaru
      await barang.save({ transaction: t });

      // Tambahkan detail pembelian
      await PembelianDetail.create({
        pembelianId: pembelian.id,
        barangId,
        qty,
        harga,
        subtotal,
      }, { transaction: t });
    }

    // Update total pembelian
    pembelian.total = totalPembelian;
    await pembelian.save({ transaction: t });

    await t.commit();
    res.status(201).json({ message: 'Pembelian berhasil dicatat', pembelian });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: 'Gagal mencatat pembelian', error: err.message });
  }
};

// DELETE Hapus Pembelian
exports.deletePembelian = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const pembelian = await Pembelian.findByPk(req.params.id, {
      include: [PembelianDetail],
      transaction: t,
    });

    if (!pembelian) {
      await t.rollback();
      return res.status(404).json({ message: 'Pembelian tidak ditemukan' });
    }

    // Rollback stok barang
    for (const detail of pembelian.PembelianDetails) {
      const barang = await Barang.findByPk(detail.barangId, { transaction: t });
      if (barang) {
        // Kurangi stok sesuai qty yang dihapus
        const stokBaru = Number(barang.stok) - Number(detail.qty);
        barang.stok = stokBaru;
        await barang.save({ transaction: t });
      }
    }

    // Hapus PembelianDetails dan Pembelian
    await PembelianDetail.destroy({ where: { pembelianId: pembelian.id }, transaction: t });
    await pembelian.destroy({ transaction: t });

    await t.commit();
    res.json({ message: 'Pembelian berhasil dihapus' });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: 'Gagal menghapus pembelian', error: err.message });
  }
};

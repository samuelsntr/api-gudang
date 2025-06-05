const { Produksi, ProduksiDetail, Barang, sequelize } = require('../models');
const { Op } = require('sequelize');

// GET Semua Produksi dengan filter tanggal dan nama barang jadi
exports.getAllProduksi = async (req, res) => {
  try {
    const { tanggalAwal, tanggalAkhir, search } = req.query;

    const whereProduksi = {};
    const whereBarangJadi = {};

    // Filter tanggal
    if (tanggalAwal && tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);
      whereProduksi.tanggal = {
        [Op.gte]: new Date(tanggalAwal),
        [Op.lt]: akhir,
      };
    } else if (tanggalAwal) {
      whereProduksi.tanggal = { [Op.gte]: new Date(tanggalAwal) };
    } else if (tanggalAkhir) {
      const akhir = new Date(tanggalAkhir);
      akhir.setDate(akhir.getDate() + 1);
      whereProduksi.tanggal = { [Op.lt]: akhir };
    }

    // Filter nama barang jadi
    if (search) {
      whereBarangJadi.nama = { [Op.like]: `%${search}%` };
    }

    const produksis = await Produksi.findAll({
      where: whereProduksi,
      include: [
        {
          model: ProduksiDetail,
          include: [Barang],
        },
        {
          model: Barang,
          as: 'BarangJadi',
          attributes: ['id', 'nama'],
          where: search ? whereBarangJadi : undefined,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(produksis);
  } catch (err) {
    res.status(500).json({
      message: 'Gagal mengambil data produksi',
      error: err.message,
    });
  }
};

// GET Produksi berdasarkan ID
exports.getProduksiById = async (req, res) => {
  try {
    const produksi = await Produksi.findByPk(req.params.id, {
      include: [
        {
          model: ProduksiDetail,
          include: [Barang],
        },
        {
          model: Barang,
          as: 'barangJadi'
        }
      ],
    });

    if (!produksi) {
      return res.status(404).json({ message: 'Produksi tidak ditemukan' });
    }

    res.json(produksi);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil produksi', error: err.message });
  }
};

// POST Tambah Produksi Barang Jadi
exports.createProduksi = async (req, res) => {
  const { barang_jadi_id, qty_hasil, keterangan, bahan_baku } = req.body;
  const t = await sequelize.transaction();

  try {
    let totalHPP = 0;

    // Validasi stok bahan dan hitung total HPP
    for (const bahan of bahan_baku) {
      const barang = await Barang.findByPk(parseInt(bahan.barangId), { transaction: t });
      if (!barang || barang.stok < bahan.qty) {
        throw new Error(`Stok tidak cukup untuk barang: ${barang?.nama || bahan.barangId}`);
      }
      totalHPP += bahan.harga * bahan.qty;
    }

    // Simpan entri produksi utama
    const produksi = await Produksi.create({
      tanggal: new Date(),
      keterangan,
      total_hpp: totalHPP,
      barang_jadi_id,
      qty_hasil: parseFloat(qty_hasil)
    }, { transaction: t });

    // Simpan detail bahan dan kurangi stok
    for (const bahan of bahan_baku) {
      const barang = await Barang.findByPk(parseInt(bahan.barangId), { transaction: t });

      // Kurangi stok
      barang.stok = Number(barang.stok) - Number(bahan.qty);
      await barang.save({ transaction: t });

      // Simpan detail produksi
      await ProduksiDetail.create({
        produksiId: produksi.id,
        barangId: parseInt(bahan.barangId),
        qty: bahan.qty,
        harga: bahan.harga,
        subtotal: bahan.qty * bahan.harga
      }, { transaction: t });
    }

    // Tambahkan stok ke barang jadi dan simpan HPP
    const barangJadi = await Barang.findByPk(parseInt(barang_jadi_id), { transaction: t });
    if (!barangJadi) {
      throw new Error("Barang jadi tidak ditemukan");
    }

    const hppPerUnit = qty_hasil > 0 ? totalHPP / qty_hasil : 0;
    // Pastikan qty_hasil dikonversi ke number dan ditambahkan ke stok
    barangJadi.stok = Number(barangJadi.stok) + Number(qty_hasil);
    barangJadi.hpp = parseFloat(hppPerUnit.toFixed(2)); // Simpan HPP
    await barangJadi.save({ transaction: t });

    await t.commit();

    return res.status(201).json({
      message: 'Produksi berhasil disimpan',
      produksi,
      hpp_per_unit: hppPerUnit
    });

  } catch (err) {
    await t.rollback();
    console.error("Gagal menyimpan produksi:", err.message);
    return res.status(500).json({
      message: 'Gagal menyimpan produksi',
      error: err.message,
    });
  }
};

// DELETE Produksi
exports.deleteProduksi = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const produksi = await Produksi.findByPk(req.params.id, {
      include: [ProduksiDetail],
      transaction: t
    });

    if (!produksi) {
      return res.status(404).json({ message: 'Produksi tidak ditemukan' });
    }

    // Rollback stok bahan baku
    for (const detail of produksi.ProduksiDetails) {
      const barang = await Barang.findByPk(detail.barangId, { transaction: t });
      if (barang) {
        barang.stok = Number(barang.stok) + Number(detail.qty);
        await barang.save({ transaction: t });
      }
    }

    // Rollback stok barang jadi
    const barangJadi = await Barang.findByPk(produksi.barang_jadi_id, { transaction: t });
    if (barangJadi) {
      barangJadi.stok = Number(barangJadi.stok) - Number(produksi.qty_hasil);
      await barangJadi.save({ transaction: t });
    }

    // Hapus data produksi
    await ProduksiDetail.destroy({ where: { produksiId: produksi.id }, transaction: t });
    await produksi.destroy({ transaction: t });

    await t.commit();
    res.json({ message: 'Produksi berhasil dihapus dan stok dikembalikan' });

  } catch (err) {
    await t.rollback();
    console.error("Gagal menghapus produksi:", err.message);
    res.status(500).json({
      message: "Gagal menghapus produksi",
      error: err.message,
    });
  }
};

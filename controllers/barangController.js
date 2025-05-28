const { Barang, BarangSetengahJadiProduksi } = require('../models');
const { Op } = require("sequelize");

exports.getAllBarang = async (req, res) => {
  try {
    const { search, jenis } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.nama = {
        [Op.like]: `%${search}%`
      };
    }

    if (jenis && jenis !== "all") {
      whereClause.jenis = jenis;
    }

    const barang = await Barang.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

    res.json(barang);
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil data barang",
      error: err.message,
    });
  }
};

// GET Barang berdasarkan ID
exports.getBarangById = async (req, res) => {
  try {
    const barang = await Barang.findByPk(req.params.id);
    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }
    res.json(barang);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil barang', error: err.message });
  }
};

// POST Tambah Barang
exports.createBarang = async (req, res) => {
  try {
    const { nama, jenis, satuan, stok, harga_beli, harga_jual } = req.body;
    const barang = await Barang.create({ nama, jenis, satuan, stok, harga_beli, harga_jual });
    res.status(201).json({ message: 'Barang berhasil ditambahkan', barang });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambah barang', error: err.message });
  }
};

// PUT Update Barang
exports.updateBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, jenis, satuan, stok, harga_beli, harga_jual } = req.body;
    const barang = await Barang.findByPk(id);

    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }

    if (barang.jenis === 'setengah_jadi' && stok && Number(stok) > 0) {
      // Cari produksi terakhir barang ini
      const lastProduksi = await BarangSetengahJadiProduksi.findOne({
        where: { barang_id: barang.id },
        order: [['createdAt', 'DESC']]
      });
    
      if (lastProduksi && lastProduksi.total_hpp) {
        const hppBaru = lastProduksi.total_hpp / Number(stok);
        barang.hpp = parseFloat(hppBaru.toFixed(2));
      }
    }    

    await barang.update({ nama, jenis, satuan, stok, harga_beli, harga_jual, hpp: barang.hpp });
    res.json({ message: 'Barang berhasil diperbarui', barang });
  } catch (err) {
    res.status(500).json({ message: 'Gagal memperbarui barang', error: err.message });
  }
};

// DELETE Hapus Barang
exports.deleteBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const barang = await Barang.findByPk(id);

    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }

    await barang.destroy();
    res.json({ message: 'Barang berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus barang', error: err.message });
  }
};

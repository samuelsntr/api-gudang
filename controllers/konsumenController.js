// controllers/KonsumenController.js
const { Konsumen } = require('../models');
const { Op } = require("sequelize");

// GET Semua Konsumen
exports.getAllKonsumen = async (req, res) => {
  try {
    const { search } = req.query;

    const whereClause = {};
    if (search) {
      whereClause.nama = { [Op.like]: `%${search}%` };
    }

    const konsumens = await Konsumen.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

    res.json(konsumens);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data konsumen', error: err.message });
  }
};

// GET Konsumen berdasarkan ID
exports.getKonsumenById = async (req, res) => {
  try {
    const konsumen = await Konsumen.findByPk(req.params.id);
    if (!konsumen) {
      return res.status(404).json({ message: 'Konsumen tidak ditemukan' });
    }
    res.json(konsumen);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil konsumen', error: err.message });
  }
};

// POST Tambah Konsumen
exports.createKonsumen = async (req, res) => {
  try {
    const { nama, kontak, alamat } = req.body;
    const konsumen = await Konsumen.create({ nama, kontak, alamat });
    res.status(201).json({ message: 'Konsumen berhasil ditambahkan', konsumen });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambah konsumen', error: err.message });
  }
};

// PUT Update Konsumen
exports.updateKonsumen = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, kontak, alamat } = req.body;
    const konsumen = await Konsumen.findByPk(id);

    if (!konsumen) {
      return res.status(404).json({ message: 'Konsumen tidak ditemukan' });
    }

    await konsumen.update({ nama, kontak, alamat });
    res.json({ message: 'Konsumen berhasil diperbarui', konsumen });
  } catch (err) {
    res.status(500).json({ message: 'Gagal memperbarui konsumen', error: err.message });
  }
};

// DELETE Hapus Konsumen
exports.deleteKonsumen = async (req, res) => {
  try {
    const { id } = req.params;
    const konsumen = await Konsumen.findByPk(id);

    if (!konsumen) {
      return res.status(404).json({ message: 'Konsumen tidak ditemukan' });
    }

    await konsumen.destroy();
    res.json({ message: 'Konsumen berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus konsumen', error: err.message });
  }
};

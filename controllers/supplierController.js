const { Supplier } = require('../models');
const { Op } = require("sequelize");

// GET Semua Supplier
exports.getAllSupplier = async (req, res) => {
  try {
    const { search } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.nama = {
        [Op.like]: `%${search}%`
      };
    }

    const suppliers = await Supplier.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data supplier', error: err.message });
  }
};

// GET Supplier berdasarkan ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier tidak ditemukan' });
    }
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil supplier', error: err.message });
  }
};

// POST Tambah Supplier
exports.createSupplier = async (req, res) => {
  try {
    const { nama, kontak, alamat } = req.body;
    const supplier = await Supplier.create({ nama, kontak, alamat });
    res.status(201).json({ message: 'Supplier berhasil ditambahkan', supplier });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambah supplier', error: err.message });
  }
};

// PUT Update Supplier
exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, kontak, alamat } = req.body;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier tidak ditemukan' });
    }

    await supplier.update({ nama, kontak, alamat });
    res.json({ message: 'Supplier berhasil diperbarui', supplier });
  } catch (err) {
    res.status(500).json({ message: 'Gagal memperbarui supplier', error: err.message });
  }
};

// DELETE Hapus Supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier tidak ditemukan' });
    }

    await supplier.destroy();
    res.json({ message: 'Supplier berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus supplier', error: err.message });
  }
};

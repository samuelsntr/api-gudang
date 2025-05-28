// controllers/HargaKhususController.js
const { HargaKhusus, Konsumen, Barang } = require("../models");
const { Op } = require("sequelize");

// ✅ GET semua harga khusus
exports.getAllHargaKhusus = async (req, res) => {
  try {
    const { search } = req.query;

    const whereClause = {};

    if (search) {
      whereClause["$Konsumen.nama$"] = {
        [Op.like]: `%${search}%`,
      };
    }

    const list = await HargaKhusus.findAll({
      where: whereClause,
      include: [
        {
          model: Konsumen,
          attributes: ["id", "nama"],
        },
        {
          model: Barang,
          attributes: ["id", "nama"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data harga khusus", error: err.message });
  }
};

exports.getHargaKhususByBarangAndKonsumen = async (req, res) => {
  try {
    const { barangId, konsumenId } = req.query;

    if (!barangId || !konsumenId) {
      return res.status(400).json({ message: "barangId dan konsumenId wajib diisi" });
    }

    const harga = await HargaKhusus.findOne({
      where: {
        barangId,
        konsumenId,
      },
    });

    if (!harga) {
      return res.status(404).json({ message: "Harga khusus tidak ditemukan" });
    }

    res.json(harga);
  } catch (err) {
    console.error("Gagal mengambil harga khusus:", err.message);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil harga khusus",
      error: err.message,
    });
  }
};

// ✅ POST tambah harga khusus
exports.createHargaKhusus = async (req, res) => {
  try {
    const { konsumenId, barangId, harga } = req.body;

    const existing = await HargaKhusus.findOne({
      where: { konsumenId, barangId },
    });

    if (existing) {
      return res.status(400).json({ message: "Harga khusus untuk konsumen dan barang ini sudah ada" });
    }

    const created = await HargaKhusus.create({ konsumenId, barangId, harga });

    res.status(201).json({ message: "Harga khusus berhasil ditambahkan", data: created });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambah harga khusus", error: err.message });
  }
};

// ✅ PUT update harga khusus
exports.updateHargaKhusus = async (req, res) => {
  try {
    const { id } = req.params;
    const { konsumenId, barangId, harga } = req.body;

    const hargaKhusus = await HargaKhusus.findByPk(id);

    if (!hargaKhusus) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await hargaKhusus.update({ konsumenId, barangId, harga });

    res.json({ message: "Harga khusus berhasil diperbarui", data: hargaKhusus });
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui harga khusus", error: err.message });
  }
};

// ✅ DELETE hapus harga khusus
exports.deleteHargaKhusus = async (req, res) => {
  try {
    const { id } = req.params;

    const hargaKhusus = await HargaKhusus.findByPk(id);
    if (!hargaKhusus) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await hargaKhusus.destroy();
    res.json({ message: "Harga khusus berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus harga khusus", error: err.message });
  }
};

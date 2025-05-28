const { BarangSetengahJadiProduksi, BarangSetengahJadiDetail, Barang, sequelize } = require('../models');
const { Op } = require('sequelize');

// controllers/BarangSetengahJadiProduksiController.js
exports.create = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      barang_setengah_jadi_id,
      tanggal,
      keterangan,
      qty_hasil,
      bahanBaku
    } = req.body;

    if (!qty_hasil || qty_hasil <= 0) {
      return res.status(400).json({ message: 'Jumlah hasil produksi harus diisi' });
    }

    // Validasi minimal
    if (!barang_setengah_jadi_id || !Array.isArray(bahanBaku) || bahanBaku.length === 0) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    // Hitung total_hpp
    const total_hpp = bahanBaku.reduce((sum, item) => {
      if (!item.qty || !item.harga) throw new Error("Qty dan harga bahan baku wajib diisi");
      return sum + (item.qty * item.harga);
    }, 0);

    // Buat entri produksi setengah jadi
    const produksi = await BarangSetengahJadiProduksi.create({
      barang_id: barang_setengah_jadi_id,
      tanggal: tanggal || new Date(), // fallback tanggal hari ini
      keterangan,
      total_hpp,
      qty_hasil // ✅ ditambahkan
    }, { transaction: t });

    // Simpan setiap bahan baku sebagai detail
    for (const item of bahanBaku) {
      await BarangSetengahJadiDetail.create({
        produksi_id: produksi.id,
        barang_id: item.barangId,
        qty: item.qty,
        harga: item.harga,
        subtotal: item.qty * item.harga  // ✅ Tambahkan ini
      }, { transaction: t });

      // Update stok barang
      const barang = await Barang.findByPk(item.barangId, { transaction: t });
      if (!barang) {
        throw new Error(`Barang ID ${item.barangId} tidak ditemukan`);
      }

      if (barang.stok < item.qty) {
        throw new Error(`Stok tidak cukup untuk barang ${barang.nama}`);
      }

      barang.stok -= item.qty;
      await barang.save({ transaction: t });
    }

    const barangSetengahJadi = await Barang.findByPk(barang_setengah_jadi_id, { transaction: t });
    if (!barangSetengahJadi) {
      throw new Error('Barang setengah jadi tidak ditemukan');
    }
    
    // Simpan nilai lama
    const stokLama = barangSetengahJadi.stok;
    const hppLama = barangSetengahJadi.hpp || 0;
    
    // Hitung total qty dan total nilai
    const totalQtyBaru = stokLama + qty_hasil;
    const totalNilaiLama = hppLama * stokLama;
    const totalNilaiBaru = total_hpp;
    
    const hppBaru = totalQtyBaru > 0
      ? (totalNilaiLama + totalNilaiBaru) / totalQtyBaru
      : 0;
    
    // Update barang
    barangSetengahJadi.stok = totalQtyBaru;
    barangSetengahJadi.hpp = parseFloat(hppBaru.toFixed(2));
    
    await barangSetengahJadi.save({ transaction: t });
    

    await t.commit();
    return res.status(201).json({
      message: 'Produksi berhasil disimpan',
      produksi_id: produksi.id,
      barang_id: barangSetengahJadi.id,
      qty_hasil,
      hpp_per_unit: barangSetengahJadi.hpp
    });

  } catch (err) {
    await t.rollback();
    console.error("Gagal simpan produksi setengah jadi:", err.message);
    return res.status(500).json({
      message: 'Gagal menyimpan produksi',
      error: err.message,
    });
  }
};


// Get all produksi setengah jadi
exports.getAll = async (req, res) => {
  try {
    const { tanggalAwal, tanggalAkhir, search } = req.query;

    const whereProduksi = {};
    const whereBarangSetengahJadi = {};

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

    // Filter nama barang setengah jadi
    if (search) {
      whereBarangSetengahJadi.nama = { [Op.like]: `%${search}%` };
    }
    
    const produksis = await BarangSetengahJadiProduksi.findAll({
      where: whereProduksi,
      include: [
        {
          model: BarangSetengahJadiDetail,
          as: 'ProduksiSetengahJadiDetails', // alias sesuai relasi hasMany
          include: [
            {
              model: Barang,
              as: 'Barang', // relasi belongsTo Barang
              attributes: ['id', 'nama']
            }
          ]
        },
        {
          model: Barang,
          as: 'BarangSetengahJadi', // alias sesuai relasi belongsTo
          attributes: ['id', 'nama'],
          where: search ? whereBarangSetengahJadi : undefined, // ✅ tambahkan filter di relasi ini
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(produksis);
  } catch (err) {
    console.error("Gagal mengambil produksi setengah jadi:", err.message);
    res.status(500).json({
      message: 'Gagal mengambil data produksi',
      error: err.message,
    });
  }
};

// DELETE Produksi Setengah Jadi
exports.delete = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const produksi = await BarangSetengahJadiProduksi.findByPk(req.params.id, {
      include: ['ProduksiSetengahJadiDetails'],
      transaction: t
    });

    if (!produksi) {
      return res.status(404).json({ message: 'Produksi tidak ditemukan' });
    }

    // Rollback stok bahan baku
    for (const detail of produksi.ProduksiSetengahJadiDetails) {
      const barang = await Barang.findByPk(detail.barang_id, { transaction: t });
      barang.stok += detail.qty;
      await barang.save({ transaction: t });
    }

    // Rollback stok barang setengah jadi
    const barangSetengahJadi = await Barang.findByPk(produksi.barang_id, { transaction: t });
    barangSetengahJadi.stok -= produksi.qty_hasil;
    await barangSetengahJadi.save({ transaction: t });

    // Hapus detail dan produksi
    await BarangSetengahJadiDetail.destroy({
      where: { produksi_id: produksi.id },
      transaction: t
    });

    await produksi.destroy({ transaction: t });

    await t.commit();
    res.json({ message: 'Produksi setengah jadi berhasil dihapus' });

  } catch (err) {
    await t.rollback();
    res.status(500).json({
      message: 'Gagal menghapus produksi setengah jadi',
      error: err.message
    });
  }
};



const {
    ReturPenjualan,
    ReturPenjualanDetail,
    Penjualan,
    Barang,
    Konsumen,
    sequelize
  } = require("../models");
  const { Op } = require("sequelize");
  
  exports.getAllReturPenjualan = async (req, res) => {
    try {
      const { tanggalAwal, tanggalAkhir, search } = req.query;
      const whereClause = {};
  
      if (tanggalAwal && tanggalAkhir) {
        const akhir = new Date(tanggalAkhir);
        akhir.setDate(akhir.getDate() + 1);
        whereClause.tanggal = {
          [Op.gte]: new Date(tanggalAwal),
          [Op.lt]: akhir,
        };
      }
  
      const returs = await ReturPenjualan.findAll({
        where: whereClause,
        include: [
          {
            model: ReturPenjualanDetail,
            include: [
              {
                model: Barang,
                attributes: ["id", "nama"],
              },
            ],
          },
          {
            model: Konsumen,
            attributes: ["id", "nama"],
          },
        ],
        ...(search && {
          where: {
            ...whereClause,
            [Op.or]: [
              { "$Konsumen.nama$": { [Op.like]: `%${search}%` } },
              { "$ReturPenjualanDetails.Barang.nama$": { [Op.like]: `%${search}%` } },
            ],
          },
          subQuery: false,
        }),
        order: [["createdAt", "DESC"]],
      });
  
      res.json(returs);
    } catch (err) {
      res.status(500).json({
        message: "Gagal mengambil data retur penjualan",
        error: err.message,
      });
    }
  };

  exports.createReturPenjualan = async (req, res) => {
    const { tanggal, penjualanId, keterangan, items } = req.body;
    const t = await sequelize.transaction();
  
    try {
      let total = 0;

      const penjualan = await Penjualan.findByPk(penjualanId);

      if (!penjualan) {
        throw new Error("Data penjualan tidak ditemukan.");
      }
  
      for (const item of items) {
        if (!item.qty || !item.harga) {
          throw new Error("Setiap item retur harus memiliki qty dan harga.");
        }
        total += item.qty * item.harga;
      }
  
      const retur = await ReturPenjualan.create({
        tanggal: tanggal ? new Date(tanggal) : new Date(),
        penjualanId,
        konsumenId: penjualan.konsumenId || null,
        total,
        keterangan,
      }, { transaction: t });
  
      for (const item of items) {
        const barang = await Barang.findByPk(item.barangId, { transaction: t });
        if (!barang) {
          throw new Error(`Barang tidak ditemukan: ID ${item.barangId}`);
        }
  
        // Kembalikan stok
        barang.stok += item.qty;
        await barang.save({ transaction: t });
  
        await ReturPenjualanDetail.create({
          returPenjualanId: retur.id,
          barangId: item.barangId,
          qty: item.qty,
          harga: item.harga,
          subtotal: item.qty * item.harga,
        }, { transaction: t });
      }
  
      await t.commit();
      res.status(201).json({ message: "Retur penjualan berhasil disimpan", retur });
    } catch (err) {
      await t.rollback();
      console.error("Gagal simpan retur penjualan:", err.message);
      res.status(500).json({ message: "Gagal menyimpan retur", error: err.message });
    }
  };
  
  
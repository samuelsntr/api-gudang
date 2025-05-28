'use strict';

module.exports = (sequelize, DataTypes) => {
  const Produksi = sequelize.define('Produksi', {
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false, // Kolom ini tidak boleh kosong
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: true, // Kolom ini boleh kosong
    },
    total_hpp: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false, // Kolom ini tidak boleh kosong
    },
    qty_hasil: {
      type: DataTypes.INTEGER,
      allowNull: false, // Kolom ini tidak boleh kosong
    }
  });

  // Relasi dengan model lain bisa didefinisikan di sini
  Produksi.associate = function(models) {
    // Relasi dengan Barang (barang_jadi_id)
    Produksi.belongsTo(models.Barang, {
      foreignKey: 'barang_jadi_id',
      as: 'BarangJadi', // ini penting biar include 'BarangJadi' berhasil
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    // Relasi dengan ProduksiDetail (one to many)
    Produksi.hasMany(models.ProduksiDetail, {
      foreignKey: 'produksiId',
      onDelete: 'CASCADE',  // Jika Produksi dihapus, ProduksiDetail juga akan dihapus
      onUpdate: 'CASCADE'   // Jika Produksi di-update, ProduksiDetail akan ikut di-update
    });
  };

  return Produksi;
};

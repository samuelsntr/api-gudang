'use strict';

module.exports = (sequelize, DataTypes) => {
  const BarangSetengahJadiProduksi = sequelize.define('BarangSetengahJadiProduksi', {
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    total_hpp: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    qty_hasil: {
      type: DataTypes.INTEGER,
      defaultValue: 0,  // Default value adalah 0
    },
  });

  BarangSetengahJadiProduksi.associate = function(models) {
    // Relasi ke barang setengah jadi
    BarangSetengahJadiProduksi.belongsTo(models.Barang, {
      foreignKey: 'barang_id',
      as: 'BarangSetengahJadi',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // Relasi ke detail bahan baku
    BarangSetengahJadiProduksi.hasMany(models.BarangSetengahJadiDetail, {
      foreignKey: 'produksi_id',
      as: 'ProduksiSetengahJadiDetails', // ✅ Tambahkan ini!
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return BarangSetengahJadiProduksi;
};

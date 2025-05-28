'use strict';

module.exports = (sequelize, DataTypes) => {
  const BarangSetengahJadiDetail = sequelize.define('BarangSetengahJadiDetail', {
    qty: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false, // Kolom ini tidak boleh kosong
    }
  },
  {
    tableName: "barangsetengahjadidetails",
    freezeTableName: true,
  }
);

  BarangSetengahJadiDetail.associate = function(models) {
    // Relasi ke produksi setengah jadi
    BarangSetengahJadiDetail.belongsTo(models.BarangSetengahJadiProduksi, {
      foreignKey: 'produksi_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Relasi ke barang bahan baku
    BarangSetengahJadiDetail.belongsTo(models.Barang, {
      foreignKey: 'barang_id',
      as: 'Barang', // ✅ Tambahkan ini!
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return BarangSetengahJadiDetail;
};

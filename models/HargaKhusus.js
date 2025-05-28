'use strict';

module.exports = (sequelize, DataTypes) => {
  const HargaKhusus = sequelize.define('HargaKhusus', {
    harga: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false, // Harga wajib diisi
    }
  });

  HargaKhusus.associate = function(models) {
    // Relasi ke Konsumen
    HargaKhusus.belongsTo(models.Konsumen, {
      foreignKey: 'konsumenId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Relasi ke Barang
    HargaKhusus.belongsTo(models.Barang, {
      foreignKey: 'barangId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return HargaKhusus;
};

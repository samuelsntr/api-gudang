'use strict';

module.exports = (sequelize, DataTypes) => {
  const Konsumen = sequelize.define('Konsumen', {
    nama: {
      type: DataTypes.STRING,
      allowNull: false, // Wajib diisi
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: true, // Opsional
    },
    kontak: {
      type: DataTypes.STRING,
      allowNull: true, // Opsional (bisa nomor WA / telepon)
    }
  },
  {
    tableName: "konsumens",
    freezeTableName: true,
  });

  Konsumen.associate = function(models) {
    // Relasi satu konsumen bisa melakukan banyak penjualan
    Konsumen.hasMany(models.Penjualan, {
      foreignKey: 'konsumenId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // Relasi ke HargaKhusus (jika nanti dibuat)
    Konsumen.hasMany(models.HargaKhusus, {
      foreignKey: 'konsumenId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Konsumen;
};

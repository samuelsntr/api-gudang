'use strict';

module.exports = (sequelize, DataTypes) => {
  const Barang = sequelize.define('Barang', {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,  // Kolom ini tidak boleh kosong
    },
    jenis: {
      type: DataTypes.ENUM('bahan_baku', 'setengah_jadi', 'barang_jadi'),
      allowNull: false,  // Kolom ini tidak boleh kosong
    },
    satuan: {
      type: DataTypes.STRING,
      allowNull: false,  // Kolom ini tidak boleh kosong
    },
    stok: {
      type: DataTypes.INTEGER,
      defaultValue: 0,  // Default value adalah 0
    },
    harga_beli: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,  // Kolom ini tidak boleh kosong
    },
    harga_jual: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,  // Kolom ini tidak boleh kosong
    },
    hpp: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
  });

  // Relasi dengan model lain bisa didefinisikan di sini
  Barang.associate = function(models) {
    // Misalnya jika ada relasi dengan model Produksi:
    // Barang.hasMany(models.Produksi, { foreignKey: 'barang_jadi_id' });
  };

  return Barang;
};

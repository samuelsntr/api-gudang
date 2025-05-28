'use strict';

module.exports = (sequelize, DataTypes) => {
  const PembelianDetail = sequelize.define('PembelianDetail', {
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false, // Kolom ini tidak boleh kosong
    },
    harga: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false, // Kolom ini tidak boleh kosong
    },
    subtotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false, // Kolom ini tidak boleh kosong
    }
  },
  {
    tableName: "pembeliandetails",
    freezeTableName: true,
  });

  // Relasi dengan model lain bisa didefinisikan di sini
  PembelianDetail.associate = function(models) {
    // Relasi dengan Pembelian
    PembelianDetail.belongsTo(models.Pembelian, {
      foreignKey: 'pembelianId',
      onDelete: 'CASCADE', // Jika Pembelian dihapus, maka PembelianDetail juga akan dihapus
      onUpdate: 'CASCADE'  // Jika Pembelian di-update, PembelianDetail juga akan ikut di-update
    });

    // Relasi dengan Barang
    PembelianDetail.belongsTo(models.Barang, {
      foreignKey: 'barangId',
      onDelete: 'SET NULL', // Jika Barang dihapus, barangId akan di-set null pada PembelianDetail
      onUpdate: 'CASCADE'   // Jika Barang di-update, barangId pada PembelianDetail akan ikut di-update
    });
  };

  return PembelianDetail;
};

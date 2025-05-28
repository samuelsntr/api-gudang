'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProduksiDetail = sequelize.define('ProduksiDetail', {
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
    tableName: "produksidetails",
    freezeTableName: true,
  });

  // Relasi dengan model lain bisa didefinisikan di sini
  ProduksiDetail.associate = function(models) {
    // Relasi dengan Produksi (produksiId)
    ProduksiDetail.belongsTo(models.Produksi, {
      foreignKey: 'produksiId',
      onDelete: 'CASCADE',  // Jika Produksi dihapus, ProduksiDetail juga akan dihapus
      onUpdate: 'CASCADE'   // Jika Produksi di-update, ProduksiDetail akan ikut di-update
    });

    // Relasi dengan Barang (barangId)
    ProduksiDetail.belongsTo(models.Barang, {
      foreignKey: 'barangId',
      onDelete: 'SET NULL',  // Jika Barang dihapus, barangId akan di-set null pada ProduksiDetail
      onUpdate: 'CASCADE'    // Jika Barang di-update, barangId pada ProduksiDetail akan ikut di-update
    });
  };

  return ProduksiDetail;
};

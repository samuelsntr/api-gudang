'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pembelian = sequelize.define('Pembelian', {
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,  // Kolom ini tidak boleh kosong
    },
    total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,  // Kolom ini tidak boleh kosong
    }
  },
  {
    tableName: "pembelians",
    freezeTableName: true,
  });

  // Relasi dengan model lain bisa didefinisikan di sini
  Pembelian.associate = function(models) {
    // Relasi dengan Supplier
    Pembelian.belongsTo(models.Supplier, { 
      foreignKey: 'supplierId', 
      onDelete: 'SET NULL', 
      onUpdate: 'CASCADE' 
    });

    // Relasi dengan PembelianDetail
    Pembelian.hasMany(models.PembelianDetail, { 
      foreignKey: 'pembelianId', 
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE' 
    });
  };

  return Pembelian;
};

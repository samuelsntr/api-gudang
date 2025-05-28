'use strict';

module.exports = (sequelize, DataTypes) => {
  const PenjualanDetail = sequelize.define('PenjualanDetail', {
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    }
  });

  PenjualanDetail.associate = function(models) {
    PenjualanDetail.belongsTo(models.Penjualan, {
      foreignKey: 'penjualanId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    PenjualanDetail.belongsTo(models.Barang, {
      foreignKey: 'barangId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return PenjualanDetail;
};

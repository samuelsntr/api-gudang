"use strict";

module.exports = (sequelize, DataTypes) => {
  const ReturPenjualan = sequelize.define("ReturPenjualan", {
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  ReturPenjualan.associate = function (models) {
    ReturPenjualan.belongsTo(models.Penjualan, {
      foreignKey: "penjualanId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    ReturPenjualan.belongsTo(models.Konsumen, {
      foreignKey: "konsumenId",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    ReturPenjualan.hasMany(models.ReturPenjualanDetail, {
      foreignKey: "returPenjualanId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return ReturPenjualan;
};

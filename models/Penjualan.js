"use strict";

module.exports = (sequelize, DataTypes) => {
  const Penjualan = sequelize.define("Penjualan", {
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
    metode_pembayaran: {
      type: DataTypes.ENUM("cash", "qris", "transfer"),
      defaultValue: "cash",
      allowNull: false,
    },
    status_pembayaran: {
      type: DataTypes.ENUM("lunas", "hutang"),
      defaultValue: "lunas",
      allowNull: false,
    },
  },
  {
    tableName: "penjualans",
    freezeTableName: true,
  });

  Penjualan.associate = function (models) {
    Penjualan.hasMany(models.PenjualanDetail, {
      foreignKey: "penjualanId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Penjualan.belongsTo(models.Konsumen, {
      foreignKey: "konsumenId",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return Penjualan;
};

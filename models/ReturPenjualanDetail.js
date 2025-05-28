"use strict";

module.exports = (sequelize, DataTypes) => {
  const ReturPenjualanDetail = sequelize.define("ReturPenjualanDetail", {
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
    },
  },{
    tableName: "returpenjualandetails",
    freezeTableName: true,
  });

  ReturPenjualanDetail.associate = function (models) {
    ReturPenjualanDetail.belongsTo(models.ReturPenjualan, {
      foreignKey: "returPenjualanId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    ReturPenjualanDetail.belongsTo(models.Barang, {
      foreignKey: "barangId",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return ReturPenjualanDetail;
};

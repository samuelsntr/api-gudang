'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Barangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      jenis: {
        type: Sequelize.ENUM('bahan_baku', 'setengah_jadi', 'barang_jadi')
      },
      satuan: {
        type: Sequelize.STRING
      },
      stok: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      harga_beli: {
        type: Sequelize.DECIMAL(15, 2)
      },
      harga_jual: {
        type: Sequelize.DECIMAL(15, 2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Barangs');
  }
};

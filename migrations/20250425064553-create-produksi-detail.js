'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProduksiDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      produksiId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Produksis',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      barangId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Barangs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      qty: {
        type: Sequelize.INTEGER
      },
      harga: {
        type: Sequelize.DECIMAL(15, 2)
      },
      subtotal: {
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
    await queryInterface.dropTable('ProduksiDetails');
  }
};

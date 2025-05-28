'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Suppliers', [
      {
        nama: 'Supplier A',
        kontak: '081234567890',
        alamat: 'Jl. Mawar No. 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Supplier B',
        kontak: '082233445566',
        alamat: 'Jl. Melati No. 2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Suppliers', null, {});
  }
};

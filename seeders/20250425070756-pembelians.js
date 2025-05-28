'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Asumsikan supplier dengan id: 1 dan barang dengan id: 1 dan 2 sudah ada
    await queryInterface.bulkInsert('Pembelians', [
      {
        supplierId: 1,
        tanggal: new Date('2025-04-20'),
        total: 155000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Ambil ID pembelian yang baru saja dimasukkan
    const pembelian = await queryInterface.sequelize.query(
      `SELECT id FROM Pembelians ORDER BY id DESC LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const pembelianId = pembelian[0].id;

    // Isi detail pembelian
    await queryInterface.bulkInsert('PembelianDetails', [
      {
        pembelianId: pembelianId,
        barangId: 1,
        qty: 10,
        harga: 7500,
        subtotal: 75000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pembelianId: pembelianId,
        barangId: 2,
        qty: 10,
        harga: 8000,
        subtotal: 80000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PembelianDetails', null, {});
    await queryInterface.bulkDelete('Pembelians', null, {});
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert satu penjualan
    await queryInterface.bulkInsert('Penjualans', [
      {
        tanggal: new Date('2025-04-24'),
        total: 150000,
        keterangan: 'Penjualan barang jadi',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Ambil ID penjualan terakhir
    const penjualan = await queryInterface.sequelize.query(
      `SELECT id FROM Penjualans ORDER BY id DESC LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const penjualanId = penjualan[0].id;

    // Insert detail penjualan (barang jadi)
    await queryInterface.bulkInsert('PenjualanDetails', [
      {
        penjualanId: penjualanId,
        barangId: 3, // barang jadi
        qty: 5,
        harga: 30000,
        subtotal: 150000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PenjualanDetails', null, {});
    await queryInterface.bulkDelete('Penjualans', null, {});
  }
};

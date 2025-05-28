'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Asumsikan barang dengan id: 3 adalah barang jadi
    await queryInterface.bulkInsert('Produksis', [
      {
        tanggal: new Date('2025-04-23'),
        keterangan: 'Produksi barang jadi dari bahan baku',
        total_hpp: 90000,
        barang_jadi_id: 3,
        qty_hasil: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Ambil ID produksi yang baru saja dibuat
    const produksi = await queryInterface.sequelize.query(
      `SELECT id FROM Produksis ORDER BY id DESC LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const produksiId = produksi[0].id;

    // Isi detail produksi (bahan baku yang digunakan)
    await queryInterface.bulkInsert('ProduksiDetails', [
      {
        produksiId: produksiId,
        barangId: 1, // contoh: bahan baku 1
        qty: 5,
        harga: 7500,
        subtotal: 37500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        produksiId: produksiId,
        barangId: 2, // contoh: bahan baku 2
        qty: 5,
        harga: 10500,
        subtotal: 52500,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProduksiDetails', null, {});
    await queryInterface.bulkDelete('Produksis', null, {});
  }
};

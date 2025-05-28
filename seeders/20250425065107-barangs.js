'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Barangs', [
      {
        nama: 'Tepung Terigu',
        satuan: 'kg',
        jenis: 'bahan_baku',
        harga_beli: 7500,   // Ganti harga jadi harga_beli
        harga_jual: 10000,  // Tambahkan harga_jual jika diperlukan
        stok: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Gula Pasir',
        satuan: 'kg',
        jenis: 'bahan_baku',
        harga_beli: 8000,
        harga_jual: 11000,
        stok: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'Kue Brownies',
        satuan: 'pcs',
        jenis: 'barang_jadi',
        harga_beli: 12000,   // Ganti harga jadi harga_beli
        harga_jual: 15000,
        stok: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Barangs', null, {});
  }
};

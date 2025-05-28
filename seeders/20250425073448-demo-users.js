'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin1',
        password: passwordHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'staff1',
        password: passwordHash,
        role: 'staff',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

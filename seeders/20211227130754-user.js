'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          firstName: 'Rafindra',
          lastName: 'Ramadhan',
          email: 'admin0205@gmail.com',
          password: await bcrypt.hash(process.env.PASSWORD, 12),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};

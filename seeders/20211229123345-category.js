'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Category',
      [
        { name: 'Beginner' },
        { name: 'Intermediate' },
        { name: 'Advanced' },
        { name: 'Japanese' },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Category', null, {});
  },
};

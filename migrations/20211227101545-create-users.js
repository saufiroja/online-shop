'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'User',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        photo_url: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        phone: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        stripe_customer_id: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        paranoid: true,
      },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('User');
  },
};

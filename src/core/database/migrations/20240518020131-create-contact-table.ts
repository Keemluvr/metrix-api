import { QueryInterface } from 'sequelize';

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cellphone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('contacts');
  },
};

import { QueryInterface } from 'sequelize';

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    await queryInterface.addColumn('users', 'address_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'addresses',
        key: 'id',
      },
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.removeColumn('users', 'address_id');
  },
};

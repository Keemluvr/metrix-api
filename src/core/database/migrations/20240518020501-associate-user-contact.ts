import { QueryInterface } from 'sequelize';

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    await queryInterface.addColumn('users', 'contact_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'contacts',
        key: 'id',
      },
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.removeColumn('users', 'contact_id');
  },
};

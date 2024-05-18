import { QueryInterface } from 'sequelize';
import { USER_BLOOD_TYPE } from 'src/modules/user/enums/userBloodType.enum';

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    await queryInterface.createTable('physicals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      blood_type: {
        type: Sequelize.ENUM(...Object.values(USER_BLOOD_TYPE)),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('physicals');
  },
};

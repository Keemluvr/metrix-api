import { QueryInterface } from 'sequelize';
import { USER_GENDER } from 'src/modules/user/enums/userGender.enum';
import { USER_ZODIAC_SIGN } from 'src/modules/user/enums/userZodiacSign.enum';

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize): Promise<void> => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.VARCHAR(11),
        allowNull: false,
        unique: true,
      },
      rg: {
        type: Sequelize.VARCHAR(9),
        allowNull: false,
        unique: true,
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM(...Object.values(USER_GENDER)),
        allowNull: false,
      },
      zodiac_sign: {
        type: Sequelize.ENUM(...Object.values(USER_ZODIAC_SIGN)),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      mother_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      father_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('users');
  },
};

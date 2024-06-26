import { QueryInterface } from 'sequelize';
import { USER_GENDER } from '../../../modules/user/enums/user-gender.enum';
import { USER_ZODIAC_SIGN } from '../../../modules/user/enums/user-zodiac-sign.enum';

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
        allowNull: true,
      },
      cpf: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true,
        allowNull: true,
      },
      rg: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
        unique: true,
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      gender: {
        type: Sequelize.ENUM(...Object.values(USER_GENDER)),
        allowNull: true,
        defaultValue: null,
      },
      zodiac_sign: {
        type: Sequelize.ENUM(...Object.values(USER_ZODIAC_SIGN)),
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      cellphone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      mother_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      father_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('users');
  },
};

'use strict';

import usersToAdd from './data/users.json';
import { QueryInterface } from 'sequelize';
import { formatUsers } from './utils/formatUser';

/** @type {import("sequelize-cli").Seed} */
module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      const [users, addresses, physicals] = await formatUsers(
        usersToAdd,
        queryInterface,
      );

      await queryInterface.bulkInsert('users', users, { transaction });
      await queryInterface.bulkInsert('addresses', addresses, {
        transaction,
      });
      await queryInterface.bulkInsert('physicals', physicals, {
        transaction,
      });
    }),

  down: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('users', null, { transaction });
      await queryInterface.bulkDelete('addresses', null, { transaction });
      await queryInterface.bulkDelete('physicals', null, { transaction });
    }),
};

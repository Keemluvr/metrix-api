'use strict';

import users from './data/users.json';
import { QueryInterface } from 'sequelize';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { convertToSnakeCase } from 'src/common/helpers/object.helper';
import { removeNonNumericCharacters } from 'src/common/helpers/string.helper';
import { parseDateFromString } from 'src/common/helpers/date.helper';
import { BCRYPT_SALT } from 'src/common/constants/auth';
import bcrypt from 'bcryptjs';

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      const promises = users.map(async (item) => {
        // already exist CPF
        const alreadyExistsUser = await queryInterface.select(null, 'users', {
          where: { cpf: removeNonNumericCharacters(item.cpf) },
        });

        if (alreadyExistsUser.length > 0)
          return console.error('User already exists in database');

        const newUser = {
          name: item.nome,
          age: item.idade,
          cpf: removeNonNumericCharacters(item.cpf),
          rg: removeNonNumericCharacters(item.rg),
          birthdate: parseDateFromString(item.data_nasc).toISOString(),
          gender: item.sexo,
          zodiacSign: item.signo,
          motherName: item.mae,
          fatherName: item.pai,
          email: item.email,
          password: await bcrypt.hash(item.senha, BCRYPT_SALT),
          phone: removeNonNumericCharacters(item.celular),
          cellphone: removeNonNumericCharacters(item.telefone_fixo),
          address: {
            cep: removeNonNumericCharacters(item.cep),
            street: item.endereco,
            number: Number(item.numero),
            neighborhood: item.bairro,
            city: item.cidade,
            state: item.estado,
          },
          physical: {
            height: Number(item.altura.replace(',', '.')),
            weight: Number(item.peso),
            bloodType: item.tipo_sanguineo,
          },
        };

        const isValid = await validate(
          plainToClass(CreateUserDto, newUser),
        ).then(async (errors) => {
          if (errors.length > 0) {
            console.error('validation failed. errors: ', errors);
            return false;
          }
          return true;
        });

        if (!isValid) return;

        const { address, physical, ...user } = newUser;

        const [user_id] = (await queryInterface.insert(
          null,
          'users',
          {
            ...convertToSnakeCase(user),
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            transaction,
          },
        )) as unknown as number[];

        await queryInterface.insert(
          null,
          'addresses',
          convertToSnakeCase({ ...address, user_id }),
          { transaction },
        );

        await queryInterface.insert(
          null,
          'physicals',
          convertToSnakeCase({ ...physical, user_id }),
          { transaction, mapToModel: true },
        );
      });

      await Promise.all(promises);
    }),

  down: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('users', null, { transaction });
      await queryInterface.bulkDelete('addresses', null, { transaction });
      await queryInterface.bulkDelete('contacts', null, { transaction });
      await queryInterface.bulkDelete('physicals', null, { transaction });
    }),
};

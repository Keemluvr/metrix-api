import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BCRYPT_SALT } from '../../../../common/constants/auth';
import { parseDateFromString } from '../../../../common/helpers/date.helper';
import { removeNonNumericCharacters } from '../../../../common/helpers/string.helper';
import { CreateUserDto } from '../../../../modules/user/dto/create-user.dto';
import { USER_GENDER } from '../../../../modules/user/enums/user-gender.enum';
import { USER_ZODIAC_SIGN } from '../../../../modules/user/enums/user-zodiac-sign.enum';
import { convertToSnakeCase } from '../../../../common/helpers/object.helper';
import bcrypt from 'bcryptjs';

const gender = {
  feminino: USER_GENDER.FEMALE,
  masculino: USER_GENDER.MALE,
};

const zodiacSign = {
  áries: USER_ZODIAC_SIGN.ARIES,
  touro: USER_ZODIAC_SIGN.TAURUS,
  gêmeos: USER_ZODIAC_SIGN.GEMINI,
  câncer: USER_ZODIAC_SIGN.CANCER,
  leão: USER_ZODIAC_SIGN.LEO,
  virgem: USER_ZODIAC_SIGN.VIRGO,
  libra: USER_ZODIAC_SIGN.LIBRA,
  escorpião: USER_ZODIAC_SIGN.SCORPIO,
  sagitário: USER_ZODIAC_SIGN.SAGITTARIUS,
  capricórnio: USER_ZODIAC_SIGN.CAPRICORN,
  aquário: USER_ZODIAC_SIGN.AQUARIUS,
  peixes: USER_ZODIAC_SIGN.PISCES,
};

export const formatUsers = async (allUsers, queryInterface) => {
  const [users, addresses, physicals] = await allUsers.reduce(
    async (acc, item, index) => {
      const [usersAcc, addressesAcc, physicalInfoAcc] = await acc;

      // already exist CPF
      const alreadyExistsUser = await queryInterface.select(null, 'users', {
        where: { cpf: removeNonNumericCharacters(item.cpf) },
      });

      if (alreadyExistsUser.length > 0) {
        console.error('User already exists in database');
        return [usersAcc, addressesAcc, physicalInfoAcc];
      }

      const id = Number(index + 1);

      const newUser = {
        id,
        name: item.nome,
        cpf: removeNonNumericCharacters(item.cpf),
        rg: removeNonNumericCharacters(item.rg),
        birthdate: parseDateFromString(item.data_nasc).toUTCString(),
        gender: gender[item.sexo.toLowerCase()],
        zodiacSign: zodiacSign[item.signo.toLowerCase()],
        motherName: item.mae,
        fatherName: item.pai,
        email: item.email,
        password: await bcrypt.hash(item.senha, BCRYPT_SALT),
        phone: removeNonNumericCharacters(item.celular),
        cellphone: removeNonNumericCharacters(item.telefone_fixo),
      };

      const address = {
        cep: removeNonNumericCharacters(item.cep),
        street: item.endereco,
        number: Number(item.numero),
        neighborhood: item.bairro,
        city: item.cidade,
        state: item.estado,
        userId: id,
      };

      const physical = {
        height: Number(item.altura.replace(',', '.')),
        weight: Number(item.peso),
        bloodType: item.tipo_sanguineo,
        userId: id,
      };

      const isValidUser = await validate(
        plainToClass(CreateUserDto, { ...newUser, address, physical }),
      ).then(async (errors) => {
        if (errors.length > 0) {
          console.error('validation failed. errors: ', errors);
          return false;
        }
        return true;
      });

      if (!isValidUser) return;

      return [
        [...usersAcc, convertToSnakeCase(newUser)],
        [...addressesAcc, convertToSnakeCase(address)],
        [...physicalInfoAcc, convertToSnakeCase(physical)],
      ];
    },
    Promise.resolve([[], [], []]),
  );

  return [users, addresses, physicals];
};

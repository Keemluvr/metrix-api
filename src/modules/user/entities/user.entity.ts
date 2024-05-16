import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { USER_ZODIAC_SIGN } from 'src/modules/user/enums/userZodiacSign.enum';
import { USER_GENDER } from '../enums/userGender.enum';
import { cpfRegex, rgRegex } from 'src/common/utilities/regex';

@Table({ tableName: 'user', timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: cpfRegex,
    },
  })
  cpf: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: rgRegex,
    },
  })
  rg: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthdate: Date;

  @Column({
    type: DataType.ENUM(...Object.values(USER_GENDER)),
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.ENUM(...Object.values(USER_ZODIAC_SIGN)),
    allowNull: false,
    field: 'zodiac_sign',
  })
  zodiacSign: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'mother_name',
  })
  motherName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'father_name',
  })
  fatherName: string;
}

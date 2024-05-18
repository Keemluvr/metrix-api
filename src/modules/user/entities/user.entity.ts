import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  AllowNull,
  Validate,
  Unique,
  AutoIncrement,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { CPF_REGEX, RG_REGEX } from 'src/common/constants/regex';

import { USER_ZODIAC_SIGN } from 'src/modules/user/enums/user-zodiac-sign.enum';
import { USER_GENDER } from '../enums/user-gender.enum';

import { Address } from './address.entity';
import { Contact } from './contact.entity';
import { Physical } from './physical.entity';

@Table({
  tableName: 'users',
  name: { singular: 'user', plural: 'users' },
  timestamps: true,
  underscored: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @ForeignKey(() => Address)
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  age: number;

  @AllowNull(false)
  @Validate({ is: CPF_REGEX })
  @Unique
  @Column
  cpf: string;

  @AllowNull(false)
  @Validate({ is: RG_REGEX })
  @Unique
  @Column
  rg: string;

  @AllowNull(false)
  @Column
  birthdate: string;

  @AllowNull(false)
  @Column({ type: DataType.ENUM(...Object.values(USER_GENDER)) })
  gender: string;

  @AllowNull(false)
  @Column({ type: DataType.ENUM(...Object.values(USER_ZODIAC_SIGN)) })
  zodiacSign: string;

  @Unique
  @AllowNull(false)
  @Validate({ isEmail: true })
  @Column
  email: string;

  @AllowNull(false)
  @Column
  motherName: string;

  @AllowNull(false)
  @Column
  fatherName: string;

  // Relations

  @ForeignKey(() => Address)
  @AllowNull(true)
  @Default(null)
  @Column({ type: DataType.INTEGER })
  addressId: number;

  @BelongsTo(() => Address, 'addressId')
  address: Address;

  @ForeignKey(() => Contact)
  @AllowNull(true)
  @Default(null)
  @Column({ type: DataType.INTEGER })
  contactId: number;

  @BelongsTo(() => Contact, 'contactId')
  contact: Contact;

  @ForeignKey(() => Physical)
  @AllowNull(true)
  @Default(null)
  @Column({ type: DataType.INTEGER })
  physicalId: number;

  @BelongsTo(() => Physical, 'physicalId')
  physical: Physical;
}

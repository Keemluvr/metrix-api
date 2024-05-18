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
} from 'sequelize-typescript';
import { USER_ZODIAC_SIGN } from 'src/modules/user/enums/userZodiacSign.enum';
import { USER_GENDER } from '../enums/userGender.enum';
import { cpfRegex, rgRegex } from 'src/common/utilities/regex';
import { Address } from './address.entity';
import { Contact } from './contact.entity';

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
  @Validate({ is: cpfRegex })
  @Unique
  @Column
  cpf: string;

  @AllowNull(false)
  @Validate({ is: rgRegex })
  @Unique
  @Column
  rg: string;

  @AllowNull(false)
  @Column
  birthdate: Date;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(USER_GENDER)),
  })
  gender: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(USER_ZODIAC_SIGN)),
    field: 'zodiac_sign',
  })
  zodiacSign: string;

  @Unique
  @AllowNull(false)
  @Validate({ isEmail: true })
  @Column
  email: string;

  @AllowNull(false)
  @Column({ field: 'mother_name' })
  motherName: string;

  @AllowNull(false)
  @Column
  fatherName: string;

  // Relations

  @ForeignKey(() => Address)
  @AllowNull(true)
  @Column({ type: DataType.INTEGER, field: 'address_id', defaultValue: null })
  addressId: number;

  @BelongsTo(() => Address, 'addressId')
  address: Address;

  @ForeignKey(() => Contact)
  @AllowNull(true)
  @Column({ type: DataType.INTEGER, field: 'contact_id', defaultValue: null })
  contactId: number;

  @BelongsTo(() => Contact, 'contactId')
  contact: Contact;
}

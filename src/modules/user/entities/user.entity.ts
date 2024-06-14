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
  Default,
  BeforeCreate,
  BeforeUpdate,
  Scopes,
  DefaultScope,
  AfterSave,
  AfterCreate,
  AfterUpdate,
  AfterUpsert,
  HasOne,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { CPF_REGEX } from '../../../common/constants/regex';

import * as bcrypt from 'bcryptjs';

import { USER_ZODIAC_SIGN } from '../../../modules/user/enums/user-zodiac-sign.enum';
import { USER_GENDER } from '../enums/user-gender.enum';
import { BCRYPT_SALT } from '../../../common/constants/auth';

import Address from './address.entity';
import Physical from './physical.entity';

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Scopes(() => ({
  withoutPassword: {
    attributes: { exclude: ['password'] },
  },
  withPassword: {
    attributes: { include: ['password'] },
  },
}))
@Table({
  tableName: 'users',
  name: { singular: 'user', plural: 'users' },
  timestamps: true,
  underscored: true,
})
export default class User extends Model<User> {
  @PrimaryKey
  @ForeignKey(() => Address)
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(true)
  @Column
  name: string;

  @AllowNull(true)
  @Validate({ is: CPF_REGEX })
  @Unique
  @Default(null)
  @Column
  cpf: string;

  @AllowNull(true)
  @Unique
  @Default(null)
  @Column
  rg: string;

  @AllowNull(true)
  @Default(null)
  @Column
  birthdate: string;

  @AllowNull(true)
  @Default(null)
  @Column({ type: DataType.ENUM(...Object.values(USER_GENDER)) })
  gender: string;

  @AllowNull(true)
  @Default(null)
  @Column({ type: DataType.ENUM(...Object.values(USER_ZODIAC_SIGN)) })
  zodiacSign: string;

  @Unique
  @AllowNull(false)
  @Validate({ isEmail: true })
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password!: string;

  @AllowNull(true)
  @Default(null)
  @Column
  phone: string;

  @AllowNull(true)
  @Default(null)
  @Column
  cellphone: string;

  @Default('')
  @AllowNull(true)
  @Default(null)
  @Column
  motherName: string;

  @Default('')
  @AllowNull(true)
  @Default(null)
  @Column
  fatherName: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  // Relations

  @HasOne(() => Address)
  address: Address;

  @HasOne(() => Physical)
  physical: Physical;

  // Hooks

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (!instance.password) return;
    instance.password = await bcrypt.hash(instance.password, BCRYPT_SALT);
    return instance;
  }

  @AfterSave
  @AfterCreate
  @AfterUpdate
  @AfterUpsert
  static removePassword(instance: User) {
    instance.password = undefined;
    return instance;
  }

  async comparePassword(password: string) {
    const isCompare = await bcrypt.compare(password, this.password);
    return isCompare;
  }
}

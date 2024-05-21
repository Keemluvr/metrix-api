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
import { CPF_REGEX, RG_REGEX } from 'src/common/constants/regex';

import * as bcrypt from 'bcryptjs';

import { USER_ZODIAC_SIGN } from 'src/modules/user/enums/user-zodiac-sign.enum';
import { USER_GENDER } from '../enums/user-gender.enum';

import { Address } from './address.entity';
import { Physical } from './physical.entity';
import { BCRYPT_SALT } from 'src/common/constants/auth';

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
export class User extends Model<User> {
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
  @Column
  cpf: string;

  @AllowNull(true)
  @Validate({ is: RG_REGEX })
  @Unique
  @Column
  rg: string;

  @AllowNull(true)
  @Column
  birthdate: string;

  @AllowNull(true)
  @Column({ type: DataType.ENUM(...Object.values(USER_GENDER)) })
  gender: string;

  @AllowNull(true)
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
  @Column
  phone: string;

  @AllowNull(true)
  @Column
  cellphone: string;

  @Default('')
  @AllowNull(true)
  @Column
  motherName: string;

  @Default('')
  @AllowNull(true)
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

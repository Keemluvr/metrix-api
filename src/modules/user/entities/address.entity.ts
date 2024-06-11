import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { BR_STATES } from '../enums/address-state.enum';

@Table({
  tableName: 'addresses',
  name: { singular: 'address', plural: 'addresses' },
  timestamps: false,
})
export class Address extends Model<Address> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  cep: string;

  @AllowNull(false)
  @Column
  street: string;

  @AllowNull(false)
  @Column
  number: number;

  @AllowNull(false)
  @Column
  neighborhood: string;

  @AllowNull(false)
  @Column
  city: string;

  @AllowNull(false)
  @Column({ type: DataType.ENUM(...Object.values(BR_STATES)) })
  state: string;

  // Relations

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}

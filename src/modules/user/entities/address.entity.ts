import {
  Table,
  Column,
  Model,
  HasOne,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user.entity';

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
  @Column
  state: string;

  // Relations

  @HasOne(() => User)
  user: User;
}

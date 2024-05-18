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
  tableName: 'contacts',
  name: { singular: 'contact', plural: 'contacts' },
  timestamps: false,
})
export class Contact extends Model<Contact> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  phone: string;

  @AllowNull(false)
  @Column
  cellphone: string;

  // Relations

  @HasOne(() => User)
  user: User;
}

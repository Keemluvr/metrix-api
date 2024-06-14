import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { USER_BLOOD_TYPE } from '../enums/user-blood-type.enum';
import User from './user.entity';

@Table({
  tableName: 'physicals',
  name: { singular: 'physical', plural: 'physicals' },
  timestamps: false,
  underscored: true,
})
export default class Physical extends Model<Physical> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column({ type: DataType.FLOAT })
  height: number;

  @AllowNull(false)
  @Column({ type: DataType.FLOAT })
  weight: number;

  @AllowNull(false)
  @Column({ type: DataType.ENUM(...Object.values(USER_BLOOD_TYPE)) })
  bloodType: string;

  // Relations

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}

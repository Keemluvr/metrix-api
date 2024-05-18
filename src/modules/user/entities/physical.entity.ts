import {
  Table,
  Column,
  Model,
  HasOne,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { USER_BLOOD_TYPE } from '../enums/userBloodType.enum';

@Table({
  tableName: 'physicals',
  name: { singular: 'physical', plural: 'physicals' },
  timestamps: false,
  underscored: true,
})
export class Physical extends Model<Physical> {
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

  @HasOne(() => User)
  user: User;
}

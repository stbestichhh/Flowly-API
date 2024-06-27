import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role, User } from '@app/common/database';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.STRING })
  roleId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  userId: string;
}

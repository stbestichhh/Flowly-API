import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role, User } from '@app/common/database';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole> {
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.STRING })
  roleId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  userId: string;
}

import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '@app/common/database';

interface RoleCreationAttributes {
  username: string;
  email: string;
  password: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({
    example: '1',
    description: 'Identifier',
  })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Role name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}

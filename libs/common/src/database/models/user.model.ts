import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttributes {
  username: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({
    example: 'uuidv4userid',
    description: 'Universally unique identifier',
  })
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @ApiProperty({ example: 'BravePlant', description: 'Username' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @ApiProperty({ example: 'brave_plant@garden.com', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'hashedPassword', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Block status' })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isBanned: boolean;

  @ApiProperty({
    example: 'For abuse',
    description: 'Reason why user has been blocked',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;
}

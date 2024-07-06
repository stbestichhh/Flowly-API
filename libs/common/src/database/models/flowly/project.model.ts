import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/common/database';

interface ProjectCreationAttributes {
  name: string;
  description: string;
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationAttributes> {
  @ApiProperty({
    example: 'uuidv4projectid',
    description: 'Universally unique identifier',
  })
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @ApiProperty({ example: 'SuperProject', description: 'Project name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'SuperProject is very cool!',
    description: 'Project description',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @ApiProperty({ example: 'uuidv4managerid', description: 'Project manager' })
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  managerId: string;

  @BelongsTo(() => User)
  manager: User;

  @HasOne(() => Team)
  team: Team;
}

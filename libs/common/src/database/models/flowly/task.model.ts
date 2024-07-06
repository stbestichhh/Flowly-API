import {
  BelongsTo,
  Column,
  DataType, ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@app/common/database';

interface TaskCreationAttributes {
  name: string;
  descriptions?: string;
  projectId: string;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttributes> {
  @ApiProperty({
    example: 'uuidv4tasktid',
    description: 'Universally unique identifier',
  })
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @ApiProperty({ example: 'Super task', description: 'Task name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'This is a super task for SuperProject', description: 'Task description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 'uuidv4projectid', description: 'Project id' })
  @ForeignKey(() => Project)
  @Column({ type: DataType.STRING })
  projectId: string;

  @BelongsTo(() => Project)
  project: Project;
}

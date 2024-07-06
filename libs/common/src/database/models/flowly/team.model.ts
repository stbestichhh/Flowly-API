import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@app/common/database';

interface TeamCreationAttributes {
  name: string;
  description: string;
}

@Table({ tableName: 'teams' })
export class Team extends Model<Team, TeamCreationAttributes> {
  @ApiProperty({
    example: 'uuidv4teamtid',
    description: 'Universally unique identifier',
  })
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @ApiProperty({ example: 'SuperTeam', description: 'Team name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsTo(() => Project)
  project: Project;
}

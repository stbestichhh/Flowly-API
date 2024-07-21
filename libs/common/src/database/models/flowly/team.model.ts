import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Project, User } from '@app/common/database';

interface TeamCreationAttributes {
  name: string;
  projectId: string;
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

  @ApiProperty({ example: 'uuidv4userid', description: 'User id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  teamLeaderId: string;

  @ApiProperty({ example: 'uuidv4projectid', description: 'Project id' })
  @ForeignKey(() => Project)
  @Column({ type: DataType.STRING })
  projectId: string;

  @BelongsTo(() => Project)
  project: Project;
}

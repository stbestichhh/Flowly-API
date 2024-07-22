import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Team, User } from '@app/common/database';

interface CollaboratorCreationAttributes {
  userId: string;
  teamId: string;
}

@Table({ tableName: 'collaborators' })
export class CollaboratorModel extends Model<CollaboratorModel, CollaboratorCreationAttributes> {
  @ApiProperty({ example: 'collaboratoruuid', description: 'Collaborator UUID' })
  @Column({ type: DataType.STRING, allowNull: false, primaryKey: true, unique: true })
  id: string;

  @ApiProperty({ example: 'useruuid', description: 'User id this collaborator relates to' })
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING, allowNull: false })
  userId: string;

  @ApiProperty({ example: 'teamuuid', description: 'Team this collaborator working in'})
  @ForeignKey(() => Team)
  @Column({ type: DataType.STRING, allowNull: false })
  teamId: string;
}

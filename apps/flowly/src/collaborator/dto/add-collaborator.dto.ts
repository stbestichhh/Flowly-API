import { AbstractDto } from '@app/common/dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCollaboratorDto extends AbstractDto {
  @ApiProperty({ example: 'useruuid', description: 'User id this collaborator relates to' })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'teamuuid', description: 'Team id this collaborator will work in' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  teamId: string;
}

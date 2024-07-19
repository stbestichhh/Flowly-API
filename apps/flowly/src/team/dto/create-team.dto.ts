import { AbstractDto } from '@app/common/dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto extends AbstractDto {
  @ApiProperty({ example: 'My team', description: 'Team name' })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  @Length(4)
  readonly name: string;

  @ApiProperty({
    example: 'projectuuid',
    description: 'Project uuid to attach created team',
  })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  readonly projectId: string;
}

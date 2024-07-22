import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @ApiProperty({ example: 'My team', description: 'Team name' })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  @Length(4)
  readonly name: string;
}

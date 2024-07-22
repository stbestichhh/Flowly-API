import { AbstractDto } from '@app/common/dto';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto extends AbstractDto {
  @ApiProperty({ example: 'My task', description: 'Task name' })
  @IsString({ message: 'Has to be string' })
  @IsNotEmpty()
  @Length(4)
  readonly name: string;

  @ApiProperty({ example: 'The hardest task', description: 'Task description' })
  @IsString({ message: 'Has to be string' })
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    example: 'projectuuid',
    description: 'Project id this task relates to',
  })
  @IsString({ message: 'Has to be a string' })
  @IsUUID()
  @IsNotEmpty()
  readonly projectId: string;
}

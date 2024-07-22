import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ example: 'My task', description: 'Task name' })
  @IsString({ message: 'Has to be string' })
  @IsNotEmpty()
  @IsOptional()
  @Length(4)
  readonly name?: string;

  @ApiProperty({ example: 'The hardest task', description: 'Task description' })
  @IsString({ message: 'Has to be string' })
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ example: 'treu', description: 'Is task completed or not' })
  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  readonly completed?: boolean;
}

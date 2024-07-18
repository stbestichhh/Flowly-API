import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({ example: 'My Project', description: 'Project name' })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  @Length(4)
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    example: 'It is my best project',
    description: 'Project description',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  @IsOptional()
  readonly description?: string;
}

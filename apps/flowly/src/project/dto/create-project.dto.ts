import { AbstractDto } from '@app/common/dto';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto extends AbstractDto {
  @ApiProperty({ example: 'My Project', description: 'Project name' })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  @Length(4)
  readonly name: string;

  @ApiProperty({
    example: 'It is my best project',
    description: 'Project description',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  readonly description?: string;
}

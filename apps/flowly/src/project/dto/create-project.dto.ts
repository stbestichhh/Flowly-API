import { AbstractDto } from '@app/common/dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto extends AbstractDto {
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  readonly description?: string;
}

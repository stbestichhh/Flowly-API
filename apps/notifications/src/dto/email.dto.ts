import { AbstractDto } from '@app/common/dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class EmailDto extends AbstractDto {
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  readonly subject: string;

  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  readonly receiver: string;

  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  readonly message: string;
}

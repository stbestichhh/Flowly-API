import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '@app/common/dto';

export class UserDto extends AbstractDto {}

export class CreateUserDto extends AbstractDto {
  @ApiProperty({ example: 'BravePlant', description: 'Username' })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  @Length(3)
  readonly username: string;

  @ApiProperty({ example: 'brave_plant@garden.com', description: 'Email' })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  @IsEmail({}, { message: 'Wrong email format' })
  readonly email: string;

  @ApiProperty({ example: 'S1rongPa6wor?', description: 'Password' })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  @IsStrongPassword({}, { message: 'Password is not strong enough' })
  @Length(4, 16, {
    message: 'Password length has to be between 4 and 16 characters length',
  })
  readonly password: string;
}

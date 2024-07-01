import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../users/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'brave_plant@garden.com', description: 'Email' })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  @IsEmail({}, { message: 'Wrong email format' })
  readonly email: string;

  @ApiProperty({ example: 'S1rongPa6wor?', description: 'Password' })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  readonly password: string;
}

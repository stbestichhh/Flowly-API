import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'BravePlant', description: 'Username' })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  @Length(3)
  @IsOptional()
  readonly username?: string;

  @ApiProperty({ example: 'S1rongPa6wor?', description: 'Password' })
  @IsNotEmpty()
  @IsString({ message: 'Has to be string' })
  @IsStrongPassword({}, { message: 'Password is not strong enough' })
  @Length(4, 16, {
    message: 'Password length has to be between 4 and 16 characters length',
  })
  @IsOptional()
  public password?: string;
}

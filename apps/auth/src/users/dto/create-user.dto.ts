import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Has to be string.' })
  @Length(3)
  username: string;

  @IsNotEmpty()
  @IsString({ message: 'Has to be string.' })
  @IsEmail({}, { message: 'Wrong email format.' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'Has to be string.' })
  @IsStrongPassword({}, { message: 'Password is not strong enough.' })
  @Length(4, 16, {
    message: 'Password length has to be between 4 and 16 characters length.',
  })
  password: string;
}

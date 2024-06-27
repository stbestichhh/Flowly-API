import { Injectable, NotFoundException } from '@nestjs/common';
import { SigninDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto';
import { IjwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  public async signup(dto: CreateUserDto) {
    //TODO hash password
    return await this.userService.create(dto);
  }

  public async signin(dto: SigninDto) {
    const user = await this.userService.getOne({ email: dto.email });

    if (!user || user.password !== dto.password) {
      throw new NotFoundException('Credentials are incorrect');
    }

    const payload: IjwtPayload = { sub: user.id, email: user.email };

    return { authentication_token: await this.jwtService.signAsync(payload) };
  }
}

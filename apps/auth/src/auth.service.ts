import { ForbiddenException, Injectable } from '@nestjs/common';
import { SigninDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto';
import { IjwtPayload } from '@app/common/interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  public async signup(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  public async signin(dto: SigninDto) {
    const user = await this.userService.getOne({ email: dto.email });

    if (!user) {
      throw new ForbiddenException('Credentials are incorrect');
    }

    const pwMatch = await bcrypt.compare(dto.password, user.password);

    if (!pwMatch) {
      throw new ForbiddenException('Credentials are incorrect');
    }

    const roles = user.roles.map((role) => role.value);
    const payload: IjwtPayload = {
      sub: user.id,
      email: user.email,
      banStatus: user.isBanned,
      roles,
    };

    return { authentication_token: await this.jwtService.signAsync(payload) };
  }
}

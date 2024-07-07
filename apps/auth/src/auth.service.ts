import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto';
import { IjwtPayload } from '@app/common/interfaces';
import * as bcrypt from 'bcrypt';
import { User } from '@app/common/database';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  public async signup(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  public async signin(user: User) {
    const roles = user.roles.map((role) => role.value);
    const payload: IjwtPayload = {
      sub: user.id,
      email: user.email,
      banStatus: user.isBanned,
      roles,
    };

    return { authentication_token: await this.jwtService.signAsync(payload) };
  }

  public async validateUser(email: string, password: string) {
    const user = await this.userService.getOne({ email });
    await this.validatePassword(user, password);
    return user;
  }

  private async validatePassword(user: User, password: string) {
    const pwMatch = await bcrypt.compare(password, user.password);

    if (!pwMatch) {
      throw new ForbiddenException('Credentials are incorrect');
    }
  }
}

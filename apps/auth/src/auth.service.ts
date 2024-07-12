import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto';
import { IjwtPayload } from '@app/common/interfaces';
import { User } from '@app/common/database';
import { ClientProxy } from '@nestjs/microservices';
import { EmailDto } from '../../notifications/src/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationsService: ClientProxy,
  ) {}

  public async signup(dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    const emailData: EmailDto = {
      subject: 'Flowly',
      receiver: user.email,
      message: 'Thank you for registration!',
    };

    this.notificationsService.emit('notify_email', emailData);

    return user;
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
}

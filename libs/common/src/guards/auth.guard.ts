import {
  CanActivate,
  ExecutionContext, ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import e from 'express';
import { ConfigService } from '@nestjs/config';
import { IjwtPayload } from '../interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload: IjwtPayload = await this.jwtService
      .verifyAsync(token, {
        secret: this.configService.get('SECRET_KEY'),
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    if (payload.banStatus) {
      throw new ForbiddenException('Your account has been blocked');
    }

    request.user = payload;

    return true;
  }

  private async extractTokenFromHeader(request: e.Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

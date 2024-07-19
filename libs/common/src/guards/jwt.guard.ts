import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '@app/common/decorators';
import e from 'express';
import { IjwtPayload } from '@app/common/interfaces';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = await this.extractTokenFromHeader(request);

    const payload: IjwtPayload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('SECRET_KEY'),
    }).catch(() => { throw new UnauthorizedException() });

    if(payload.banStatus) {
      throw new ForbiddenException('Your account has been blocked');
    }

    return super.canActivate(context);
  }

  private async extractTokenFromHeader(request: e.Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

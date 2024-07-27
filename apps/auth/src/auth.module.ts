import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { LoggerModule } from '@app/common/logger';
import * as Joi from 'joi';
import { RateLimitterModule } from '@app/common/rate-limitter';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies';
import { JwtStrategy } from '@app/common/strategies';
import { HealthModule } from './health/health.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as process from 'process';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    LoggerModule,
    RateLimitterModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        AUTH_PORT: Joi.number().port().required(),
        AUTH_HOST: Joi.string().hostname().required(),
        SECRET_KEY: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        NOTIFICATIONS_HOST: Joi.string().hostname().required(),
        NOTIFICATIONS_PORT: Joi.number().port().required(),
        // AUTH_EVENT_HOST: Joi.string().hostname().required(),
        // AUTH_EVENT_PORT: Joi.number().port().required(),
        REDIS_HOST: Joi.string().hostname().required(),
        REDIS_PORT: Joi.number().port().required(),
        REDIS_PASSWORD: Joi.string().required(),
      }),
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('SECRET_KEY'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    RolesModule,
    HealthModule,
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATIONS_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
            password: configService.get<string>('REDIS_PASSWORD'),
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AuthModule {}

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
import * as process from 'process';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RabbitMqModule } from '@app/common/rabbit-mq';
import { HttpsService, ShutdownObserver } from '@app/common/https';

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
        NOTIFICATIONS_HOST: Joi.string().hostname(),
        NOTIFICATIONS_PORT: Joi.number().port(),
        RABBITMQ_URL: Joi.string().required(),
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
    RabbitMqModule.registerAsync(
      'NOTIFICATIONS_SERVICE',
      'notifications_queue',
    ),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    ShutdownObserver,
    HttpsService,
  ],
})
export class AuthModule {}

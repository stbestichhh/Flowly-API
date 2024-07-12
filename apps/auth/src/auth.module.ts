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

@Module({
  imports: [
    PassportModule,
    UsersModule,
    LoggerModule,
    RateLimitterModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().port().required(),
        HTTP_HOST: Joi.string().hostname().required(),
        SECRET_KEY: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        NOTIFICATIONS_HOST: Joi.string().hostname().required(),
        NOTIFICATIONS_PORT: Joi.number().port().required(),
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
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('NOTIFICATIONS_HOST'),
            port: configService.get<number>('NOTIFICATIONS_PORT'),
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

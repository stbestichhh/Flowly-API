import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { LoggerModule } from '@app/common/logger';

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('SECRET_KEY'),
        signOptions: { expiresIn: '48h' },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    RolesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

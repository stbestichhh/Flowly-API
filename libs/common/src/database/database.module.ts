import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Project, Role, User, UserRole } from '@app/common/database/models';
import * as process from 'process';
import * as Joi from 'joi';
import { Logger as PinoLogger } from 'nestjs-pino';
import { LoggerModule } from '@app/common/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().hostname().required(),
        POSTGRES_PORT: Joi.number().port().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService, logger: PinoLogger) => ({
        dialect: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: Number(configService.get('POSTGRES_PORT')),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        models: [User, Role, UserRole, Project],
        autoLoadModels: true,
        sync: { alter: true, force: false },
        logging: (msg) => logger.log(msg, SequelizeModule.name),
      }),
      inject: [ConfigService, PinoLogger],
      imports: [ConfigModule, LoggerModule],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(entities: any[]) {
    return SequelizeModule.forFeature(entities);
  }
}

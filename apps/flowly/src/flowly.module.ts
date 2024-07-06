import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import * as process from 'process';
import { LoggerModule } from '@app/common/logger';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().port().required(),
        HTTP_HOST: Joi.string().hostname().required(),
      }),
    }),
    ProjectModule,
  ],
})
export class FlowlyModule {}

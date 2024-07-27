import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common/logger';
import { EmailModule } from '@app/common/email';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        NOTIFICATIONS_PORT: Joi.number().port(),
        NOTIFICATIONS_HOST: Joi.string().hostname(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    LoggerModule,
    EmailModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}

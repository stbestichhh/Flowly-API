import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMqService } from '@app/common/rabbit-mq/rabbit-mq.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import * as Joi from 'joi';

@Module({
  imports: [
    ClientsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        RABBITMQ_URL: Joi.string().required(),
      }),
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
  ],
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {
  public static registerAsync(name: string, queue: string) {
    ClientsModule.registerAsync([
      {
        name,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue,
            queueOptions: {
              durable: false,
            },
          },
        }),
        imports: [ConfigModule],
        inject: [ConfigService],
      },
    ]);
  }
}

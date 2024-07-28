import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        RABBITMQ_URL: Joi.string().required(),
      }),
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
  ],
})
export class RabbitMqModule {
  public static registerAsync(name: string, queue: string) {
    return ClientsModule.registerAsync([
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

import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { RmqOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule, {
    bufferLogs: true,
    cors: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger(bootstrap.name);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const RABBITMQ_URL = configService.get<string>('RABBITMQ_URL');

  app.useLogger(app.get<PinoLogger>(PinoLogger));
  app.enableCors();
  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'notifications_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices().then(async () => {
    logger.log(`Microservice is running on ${RABBITMQ_URL}`);
  });
}
bootstrap();

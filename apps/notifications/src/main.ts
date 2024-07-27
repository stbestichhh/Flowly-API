import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';

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

  // const PORT = configService.get<number>('NOTIFICATIONS_PORT');
  // const HOST = configService.get<string>('NOTIFICATIONS_HOST');
  const REDIS_HOST = configService.get<string>('REDIS_HOST');
  const REDIS_PORT = configService.get<number>('REDIS_PORT');
  const REDIS_PASSWORD = configService.get<string>('REDIS_PASSWORD');

  app.useLogger(app.get<PinoLogger>(PinoLogger));
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    },
  });

  await app.startAllMicroservices().then(async () => {
    logger.log(`Microservice is running on http://${REDIS_HOST}:${REDIS_PORT}`);
  });
}
bootstrap();

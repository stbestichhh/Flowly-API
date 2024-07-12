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

  const PORT = configService.get<number>('NOTIFICATIONS_PORT');
  const HOST = configService.get<string>('NOTIFICATIONS_HOST');

  app.useLogger(app.get<PinoLogger>(PinoLogger));
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: HOST,
      port: PORT,
    },
  });

  await app.startAllMicroservices().then(async () => {
    logger.log(`Microservice is running on http://${HOST}:${PORT}`);
  });
}
bootstrap();

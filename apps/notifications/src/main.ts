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

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  app.useLogger(app.get<PinoLogger>(PinoLogger));
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get<number>('NOTIFICATIONS_PORT'),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();

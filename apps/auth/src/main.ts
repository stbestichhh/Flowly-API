import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger as PinoLogger } from 'nestjs-pino';
import helmet from 'helmet';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { HttpsService, ShutdownObserver } from '@app/common/https';
import * as https from 'https';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AuthModule, {
    bufferLogs: true,
    cors: true,
  });

  const httpsService: HttpsService = app.get(HttpsService);
  const httpsOptions = httpsService.getCertificate();
  const shutdownObserver: ShutdownObserver = app.get(ShutdownObserver);

  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger(bootstrap.name);

  const PORT = configService.get<number>('AUTH_PORT');
  const HOST = configService.get<string>('AUTH_HOST');
  const AUTH_HTTPS_PORT = configService.get<number>('AUTH_HTTPS_PORT');
  const RABBITMQ_URL = configService.get<string>('RABBITMQ_URL');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Authorization')
    .setDescription('Flowly authorization microservice API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/auth/docs', app, document);
  logger.log(`Docs are running on: ${HOST}:${PORT}/api/auth/docs`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get<PinoLogger>(PinoLogger));
  app.use(helmet());
  app.enableCors();
  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'auth-queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  const httpsServer = https.createServer(httpsOptions, server);
  shutdownObserver.addServer(httpsServer);

  await httpsServer.listen(AUTH_HTTPS_PORT, HOST, async () => {
    logger.log(`Secure service is running on ${HOST}:${AUTH_HTTPS_PORT}`);
  });
  await app.listen(PORT, HOST, async () => {
    logger.log(`Service is running on ${HOST}:${PORT}`);
  });
  await app.startAllMicroservices().then(async () => {
    logger.log(`Microservice is running on ${RABBITMQ_URL}`);
  });
}
bootstrap();

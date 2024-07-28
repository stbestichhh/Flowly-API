import { NestFactory } from '@nestjs/core';
import { FlowlyModule } from './flowly.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { HttpsService, ShutdownObserver } from '@app/common/https';
import * as https from 'https';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    FlowlyModule,
    {
      bufferLogs: true,
      cors: true,
    },
  );
  await app.init();

  const httpsService: HttpsService = app.get(HttpsService);
  const httpsOptions = httpsService.getCertificate();
  const shutdownObserver: ShutdownObserver = app.get(ShutdownObserver);

  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger(bootstrap.name);

  const PORT = configService.get<number>('HTTP_PORT');
  const HOST = configService.get<string>('HTTP_HOST');
  const FLOWLY_HTTPS_PORT = configService.get<number>('FLOWLY_HTTPS_PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Flowly-api')
    .setDescription('Flowly general functionality microservice.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/flowly/docs', app, document);
  logger.log(`Docs are running on: ${HOST}:${PORT}/api/auth/docs`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get<PinoLogger>(PinoLogger));
  app.use(helmet());
  app.enableCors();

  const httpsServer = https.createServer(httpsOptions, server);
  shutdownObserver.addServer(httpsServer);

  await httpsServer.listen(FLOWLY_HTTPS_PORT, HOST, async () => {
    logger.log(`Secure service is running on ${HOST}:${FLOWLY_HTTPS_PORT}`);
  });
  await app.listen(PORT, HOST, async () => {
    logger.log(`Service is running on ${HOST}:${PORT}`);
  });
}
bootstrap();

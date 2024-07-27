import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger as PinoLogger } from 'nestjs-pino';
import helmet from 'helmet';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, {
    bufferLogs: true,
    cors: true,
  });
  const configService = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Authorization')
    .setDescription('Flowly authorization microservice API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/auth/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const PORT = configService.get<number>('AUTH_PORT');
  const HOST = configService.get<string>('AUTH_HOST');
  // const EVENT_PORT = configService.get<number>('AUTH_EVENT_PORT');
  // const EVENT_HOST = configService.get<string>('AUTH_EVENT_HOST');
  const REDIS_HOST = configService.get<string>('REDIS_HOST');
  const REDIS_PORT = configService.get<number>('REDIS_PORT');
  const REDIS_PASSWORD = configService.get<string>('REDIS_PASSWORD');

  app.useLogger(app.get(PinoLogger));
  app.use(helmet());
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
  await app.listen(PORT, HOST, async () => {
    logger.log(`Service is running on ${await app.getUrl()}`);
    logger.log(`Docs are running on: ${await app.getUrl()}/api/auth/docs`);
  });
}
bootstrap();

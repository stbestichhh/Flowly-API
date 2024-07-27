import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger as PinoLogger } from 'nestjs-pino';
import helmet from 'helmet';
import { RmqOptions, Transport } from '@nestjs/microservices';

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
  const RABBITMQ_URL = configService.get<string>('RABBITMQ_URL');

  app.useLogger(app.get(PinoLogger));
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

  await app.startAllMicroservices().then(async () => {
    logger.log(`Microservice is running on ${RABBITMQ_URL}`);
  });
  await app.listen(PORT, HOST, async () => {
    logger.log(`Service is running on ${await app.getUrl()}`);
    logger.log(`Docs are running on: ${await app.getUrl()}/api/auth/docs`);
  });
}
bootstrap();

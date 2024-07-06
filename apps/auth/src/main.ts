import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger as PinoLogger } from 'nestjs-pino';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);

  app.useLogger(app.get(PinoLogger));

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

  app.use(helmet());
  app.enableCors();

  const PORT = configService.get('HTTP_PORT');
  const HOST = configService.get('HTTP_HOST');

  await app.listen(PORT, HOST, async () => {
    logger.log(`Service is running on ${await app.getUrl()}`);
    logger.log(`Docs are running on: ${await app.getUrl()}/api/auth/docs`);
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { FlowlyModule } from './flowly.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(FlowlyModule, {
    bufferLogs: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger(bootstrap.name);

  app.useLogger(app.get(PinoLogger));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Flowly-api')
    .setDescription('Flowly general functionality microservice.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/flowly/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(helmet());
  app.enableCors();
  app.use(helmet());

  const PORT = configService.get<number>('HTTP_PORT');
  const HOST = configService.get<string>('HTTP_HOST');

  await app.listen(PORT, HOST, async () => {
    logger.log(`Service is running on ${await app.getUrl()}`);
    logger.log(`Docs are running on: ${await app.getUrl()}/api/flowly/docs`);
  });
}
bootstrap();

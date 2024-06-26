import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Authorization')
    .setDescription('Flowly authorization microservice API')
    .setVersion('1.0.0')
    .addTag('Flowly API')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/auth/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const PORT = configService.get('HTTP_PORT');
  const HOST = configService.get('HTTP_HOST');

  await app.listen(PORT, HOST, () => {
    console.log(`Service is runnig on http://${HOST}:${PORT}`);
  });
}
bootstrap();

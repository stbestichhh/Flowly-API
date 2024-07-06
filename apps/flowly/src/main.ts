import { NestFactory } from '@nestjs/core';
import { FlowlyModule } from './flowly.module';

async function bootstrap() {
  const app = await NestFactory.create(FlowlyModule);
  await app.listen(3000);
}
bootstrap();

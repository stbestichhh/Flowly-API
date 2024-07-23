import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, TerminusModule, HttpModule],
  controllers: [HealthController],
})
export class HealthModule {}

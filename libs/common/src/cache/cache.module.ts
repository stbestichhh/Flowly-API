import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import process from 'process';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: Joi.object({
        CACHE_TTL: Joi.number().required(),
      }),
    }),
    NestCacheModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get<number>('CACHE_TTL'),
      }),
      imports: [ConfigModule],
    }),
  ],
})
export class CacheModule {}

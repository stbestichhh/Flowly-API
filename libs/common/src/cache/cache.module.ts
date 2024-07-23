import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        CACHE_TTL: Joi.number().required(),
      }),
      isGlobal: true,
    }),
  ],
})
export class CacheModule {
  public static registerAsync() {
    return NestCacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        ttl: Number(configService.get<number>('CACHE_TTL')),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    });
  }
}

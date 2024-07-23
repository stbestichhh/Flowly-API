import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import * as Joi from 'joi';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        CACHE_TTL: Joi.number().required(),
        REDIS_HOST: Joi.string().hostname().required(),
        REDIS_PORT: Joi.number().port().required(),
        REDIS_PASSWORD: Joi.string().required(),
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
        store: await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
          password: configService.get<string>('REDIS_PASSWORD'),
        }),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    });
  }
}

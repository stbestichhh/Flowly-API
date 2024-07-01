import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        THROTTLE_TTL: Joi.number(),
        THROTTLE_LIMIT: Joi.number(),
      }),
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get('THROTTLE_TTL'),
          limit: configService.get('THROTTLE_LIMIT'),
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
})
export class RateLimitterModule {}

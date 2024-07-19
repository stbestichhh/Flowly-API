import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { JwtStrategy } from '@app/common/strategies';
import { ProjectRepository } from './project.repository';
import { DatabaseModule, Project } from '@app/common/database';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule.forFeature([Project]),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('AUTH_EVENT_HOST'),
            port: configService.get<number>('AUTH_EVENT_PORT'),
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, JwtStrategy, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}

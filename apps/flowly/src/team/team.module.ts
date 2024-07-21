import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { DatabaseModule, Team } from '@app/common/database';
import { TeamRepository } from './team.repository';
import { ProjectModule } from '../project/project.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [TeamService, TeamRepository],
  controllers: [TeamController],
  imports: [
    ProjectModule,
    DatabaseModule.forFeature([Team]),
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
})
export class TeamModule {}

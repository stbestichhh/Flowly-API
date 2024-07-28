import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { DatabaseModule, Team } from '@app/common/database';
import { TeamRepository } from './team.repository';
import { ProjectModule } from '../project/project.module';
import { RabbitMqModule } from '@app/common/rabbit-mq';

@Module({
  providers: [TeamService, TeamRepository],
  controllers: [TeamController],
  imports: [
    ProjectModule,
    DatabaseModule.forFeature([Team]),
    RabbitMqModule.registerAsync('AUTH_SERVICE', 'auth_queue'),
  ],
})
export class TeamModule {}

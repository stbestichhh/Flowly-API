import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { JwtStrategy } from '@app/common/strategies';
import { ProjectRepository } from './project.repository';
import { DatabaseModule, Project } from '@app/common/database';
import { RabbitMqModule } from '@app/common/rabbit-mq';

@Module({
  imports: [
    DatabaseModule.forFeature([Project]),
    RabbitMqModule.registerAsync('AUTH_SERVICE', 'auth_queue'),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, JwtStrategy, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}

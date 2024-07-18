import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { DatabaseModule, Project } from '@app/common/database';
import { RateLimitterModule } from '@app/common/rate-limitter';
import { JwtStrategy } from '@app/common/strategies';
import { ProjectRepository } from './project.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Project]),
    RateLimitterModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService, JwtStrategy, ProjectRepository],
})
export class ProjectModule {}

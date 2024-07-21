import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './task.repository';
import { DatabaseModule, Project, Task } from '@app/common/database';
import { ProjectRepository } from '../project/project.repository';

@Module({
  providers: [TasksService, TaskRepository, ProjectRepository],
  controllers: [TasksController],
  imports: [DatabaseModule.forFeature([Task, Project])],
})
export class TasksModule {}

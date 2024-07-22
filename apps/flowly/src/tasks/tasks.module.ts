import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './task.repository';
import {
  Collaborator,
  DatabaseModule,
  Project,
  Task,
} from '@app/common/database';
import { ProjectRepository } from '../project/project.repository';
import { CollaboratorRepository } from '../collaborator/collaborator.repository';

@Module({
  providers: [
    TasksService,
    TaskRepository,
    ProjectRepository,
    CollaboratorRepository,
  ],
  controllers: [TasksController],
  imports: [DatabaseModule.forFeature([Task, Project, Collaborator])],
})
export class TasksModule {}

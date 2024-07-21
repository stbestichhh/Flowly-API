import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './task.repository';
import { DatabaseModule, Task } from '@app/common/database';

@Module({
  providers: [TasksService, TaskRepository],
  controllers: [TasksController],
  imports: [DatabaseModule.forFeature([Task])],
})
export class TasksModule {}

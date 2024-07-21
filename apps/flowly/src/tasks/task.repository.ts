import { AbstractRepository, Task } from '@app/common/database';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';

export class TaskRepository extends AbstractRepository<Task> {
  constructor(@InjectModel(Task) protected readonly model: ModelCtor<Task>) {
    super(model);
  }
}

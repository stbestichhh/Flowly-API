import { AbstractRepository, Project } from '@app/common/database';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProjectRepository extends AbstractRepository<Project> {
  constructor(@InjectModel(Project) protected readonly model: typeof Project) {
    super(model);
  }
}

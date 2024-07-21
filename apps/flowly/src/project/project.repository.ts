import { AbstractRepository, Project } from '@app/common/database';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';

@Injectable()
export class ProjectRepository extends AbstractRepository<Project> {
  constructor(
    @InjectModel(Project) protected readonly model: ModelCtor<Project>,
  ) {
    super(model);
  }
}

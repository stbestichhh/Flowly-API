import { AbstractRepository, Collaborator } from '@app/common/database';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CollaboratorRepository extends AbstractRepository<Collaborator> {
  constructor(
    @InjectModel(Collaborator)
    protected readonly model: ModelCtor<Collaborator>,
  ) {
    super(model);
  }
}

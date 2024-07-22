import { AbstractRepository, Team } from '@app/common/database';
import { Injectable } from '@nestjs/common';
import { ModelCtor } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TeamRepository extends AbstractRepository<Team> {
  constructor(@InjectModel(Team) protected readonly model: ModelCtor<Team>) {
    super(model);
  }
}

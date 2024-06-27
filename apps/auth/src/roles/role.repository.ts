import { AbstractRepository, Role } from '@app/common/database';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
  constructor(@InjectModel(Role) protected readonly model: typeof Role) {
    super(model);
  }
}

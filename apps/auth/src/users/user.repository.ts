import { AbstractRepository, User } from '@app/common/database';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(@InjectModel(User) protected readonly model: typeof User) {
    super(model);
  }
}

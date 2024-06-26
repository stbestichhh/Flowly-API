import { AbstractRepository, User } from '@app/common/database';
import { InjectModel } from '@nestjs/sequelize';

export class UserRepository extends AbstractRepository<User> {
  constructor(@InjectModel(User) private readonly model: typeof User) {
    super(model);
  }
}

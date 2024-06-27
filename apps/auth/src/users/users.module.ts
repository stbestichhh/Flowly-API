import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule, User } from '@app/common/database';
import { UserRepository } from './user.repository';

@Module({
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  imports: [DatabaseModule, DatabaseModule.forFeatue([User])],
  exports: [UsersService],
})
export class UsersModule {}

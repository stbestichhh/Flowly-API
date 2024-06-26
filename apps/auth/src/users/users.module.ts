import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule, User } from '@app/common/database';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [DatabaseModule.forFeatue([User])],
})
export class UsersModule {}

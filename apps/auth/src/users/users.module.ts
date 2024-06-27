import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule, User } from '@app/common/database';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  imports: [DatabaseModule, DatabaseModule.forFeatue([User]), JwtModule],
  exports: [UsersService],
})
export class UsersModule {}

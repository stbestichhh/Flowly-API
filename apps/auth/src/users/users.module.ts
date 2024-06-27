import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule, Role, User, UserRole } from '@app/common/database';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { RoleRepository } from '../roles/role.repository';

@Module({
  providers: [UsersService, UserRepository, RoleRepository],
  controllers: [UsersController],
  imports: [
    DatabaseModule,
    DatabaseModule.forFeatue([Role, User, UserRole]),
    JwtModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}

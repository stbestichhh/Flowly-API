import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DatabaseModule, Role, User, UserRole } from '@app/common/database';
import { JwtModule } from '@nestjs/jwt';
import { RoleRepository } from './role.repository';

@Module({
  providers: [RolesService, RoleRepository],
  controllers: [RolesController],
  imports: [
    DatabaseModule,
    DatabaseModule.forFeatue([Role, User, UserRole]),
    JwtModule,
  ],
})
export class RolesModule {}

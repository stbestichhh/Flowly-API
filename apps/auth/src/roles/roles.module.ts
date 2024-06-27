import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DatabaseModule, Role, User, UserRole } from '@app/common/database';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [DatabaseModule, DatabaseModule.forFeatue([Role, User, UserRole])],
})
export class RolesModule {}

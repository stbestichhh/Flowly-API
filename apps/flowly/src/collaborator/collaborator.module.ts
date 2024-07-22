import { Module } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { CollaboratorRepository } from './collaborator.repository';
import { Collaborator, DatabaseModule, Team } from '@app/common/database';
import { JwtStrategy } from '@app/common/strategies';
import { TeamRepository } from '../team/team.repository';

@Module({
  providers: [CollaboratorService, CollaboratorRepository, JwtStrategy, TeamRepository],
  controllers: [CollaboratorController],
  imports: [DatabaseModule.forFeature([Collaborator, Team])],
})
export class CollaboratorModule {}

import { Module } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { CollaboratorRepository } from './collaborator.repository';
import { Collaborator, DatabaseModule } from '@app/common/database';
import { JwtStrategy } from '@app/common/strategies';

@Module({
  providers: [CollaboratorService, CollaboratorRepository, JwtStrategy],
  controllers: [CollaboratorController],
  imports: [DatabaseModule.forFeature([Collaborator])],
})
export class CollaboratorModule {}

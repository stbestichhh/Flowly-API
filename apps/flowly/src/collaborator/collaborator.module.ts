import { Module } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';

@Module({
  providers: [CollaboratorService],
  controllers: [CollaboratorController]
})
export class CollaboratorModule {}

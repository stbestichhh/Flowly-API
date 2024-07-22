import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CollaboratorRepository } from './collaborator.repository';
import { TeamRepository } from '../team/team.repository';
import { AddCollaboratorDto } from './dto';

@Injectable()
export class CollaboratorService {
  constructor(private readonly collalboratorRepository: CollaboratorRepository, private readonly teamRepository: TeamRepository) {}

  public async getAll(teamLeaderId: string, teamId: string) {
    await this.checkTeamLeaderOnTeam(teamId, teamLeaderId);
    return await this.collalboratorRepository.findAll({ teamId });
  }

  public async getById(id: string, teamLeaderId: string, teamId: string) {
    await this.checkTeamLeaderOnTeam(teamId, teamLeaderId);
    return await this.collalboratorRepository.findByPk(id);
  }

  public async add(dto: AddCollaboratorDto, teamLeaderId: string) {
    await this.checkTeamLeaderOnTeam(dto.teamId, teamLeaderId);
    return await this.collalboratorRepository.create(dto);
  }

  async delete(id: string, teamLeaderId: string, teamId: string) {
    await this.checkTeamLeaderOnTeam(teamId, teamLeaderId);
    return await this.collalboratorRepository.delete(id);
  }

  private async checkTeamLeaderOnTeam(teamId: string, teamLeaderId: string) {
    const team = await this.teamRepository.findByPk(teamId);

    if (teamLeaderId !== team.teamLeaderId) {
      throw new ForbiddenException();
    }
  }
}

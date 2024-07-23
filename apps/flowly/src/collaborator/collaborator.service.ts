import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CollaboratorRepository } from './collaborator.repository';
import { TeamRepository } from '../team/team.repository';
import { AddCollaboratorDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { RolesEnum } from '@app/common/enums';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly collalboratorRepository: CollaboratorRepository,
    private readonly teamRepository: TeamRepository,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

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

    const collaborator = await this.collalboratorRepository.findOne({
      userId: dto.userId,
      teamId: dto.teamId,
    });

    if (collaborator) {
      throw new ForbiddenException('Collaborator already exists');
    }

    await this.authService.emit('give_role', {
      userId: dto.userId,
      role: RolesEnum.COLLABORATOR,
    });

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

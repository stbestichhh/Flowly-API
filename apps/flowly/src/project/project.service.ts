import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { ProjectRepository } from './project.repository';
import { ClientProxy } from '@nestjs/microservices';
import { RolesEnum } from '@app/common/enums';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  public async getAll() {
    return await this.projectRepository.findAll();
  }

  public async getAllbyUser(managerId: string) {
    return await this.projectRepository.findAll({ managerId });
  }

  public async getById(id: string, managerId: string) {
    const project = await this.projectRepository.findByPk(id);

    if(project.managerId !== managerId) {
      throw new NotFoundException(`Entity not found by id: ${id}`);
    }

    return project;
  }

  public async create(dto: CreateProjectDto, managerId: string) {
    const project = await this.projectRepository.create({ ...dto, managerId });

    await this.authService.emit('give_role', { userId: managerId, role: RolesEnum.PROJECT_MANAGER });

    return project;
  }

  public async update(dto: UpdateProjectDto, id: string, managerId: string) {
    await this.getById(id, managerId);
    return await this.projectRepository.update(id, dto);
  }

  public async delete(id: string, managerId: string) {
    await this.getById(id, managerId);
    return await this.projectRepository.delete(id);
  }
}

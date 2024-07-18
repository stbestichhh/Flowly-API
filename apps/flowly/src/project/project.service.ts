import { Injectable } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  public async getAll() {
    return await this.projectRepository.findAll();
  }

  public async getById(id: string) {
    return await this.projectRepository.findByPk(id);
  }

  public async create(dto: CreateProjectDto, managerId: string) {
    return await this.projectRepository.create({ ...dto, managerId });
  }

  public async update(dto: UpdateProjectDto, id: string) {
    return await this.projectRepository.update(id, dto);
  }

  public async delete(id: string) {
    return await this.projectRepository.delete(id);
  }
}

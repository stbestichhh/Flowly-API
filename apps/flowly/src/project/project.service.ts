import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  public async getAll() {}

  public async getById(id: string) {}

  public async create(dto: CreateProjectDto, managerId: string) {}

  public async update(dto: UpdateProjectDto, projectId: string) {}

  public async delete(id: string) {}
}

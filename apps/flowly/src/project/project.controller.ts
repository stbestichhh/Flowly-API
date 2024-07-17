import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@app/common/decorators';
import { RolesEnum } from '@app/common/enums';
import { JwtGuard, RoleGuard } from '@app/common/guards';
import { ProjectService } from './project.service';

@ApiTags('Projects')
@Roles(RolesEnum.PROJECT_MANAGER)
@UseGuards(JwtGuard, RoleGuard)
@ApiBearerAuth()
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  public async getAll() {
    return await this.projectService.getAll();
  }

  @Get(':id')
  public async getById() {
    return await this.projectService.getById();
  }

  @Post()
  public async create() {
    return await this.projectService.create();
  }

  @Patch(':id')
  public async update() {
    return await this.projectService.update();
  }

  @Delete(':id')
  public async delete() {
    return await this.projectService.delete();
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '@app/common/decorators';
import { RolesEnum } from '@app/common/enums';
import { JwtGuard, RoleGuard } from '@app/common/guards';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('Projects')
@Roles(RolesEnum.PROJECT_MANAGER)
@UseGuards(JwtGuard, RoleGuard)
@ApiBearerAuth()
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Roles(RolesEnum.ADMIN)
  @Get('all')
  public async getAll() {
    return await this.projectService.getAll();
  }

  @Get()
  public async getAllByUser() {
    return await this.projectService.getAll();
  }

  @Get(':id')
  public async getById(@Param() id: string) {
    return await this.projectService.getById(id);
  }

  @Post()
  public async create(
    @Body() dto: CreateProjectDto,
    @CurrentUser('sub') managerId: string,
  ) {
    return await this.projectService.create(dto, managerId);
  }

  @Patch(':id')
  public async update(@Body() dto: UpdateProjectDto, @Param() id: string) {
    return await this.projectService.update(dto, id);
  }

  @Delete(':id')
  public async delete(@Param() id: string) {
    return await this.projectService.delete(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, Roles } from '@app/common/decorators';
import { RolesEnum } from '@app/common/enums';
import { JwtGuard, RoleGuard } from '@app/common/guards';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { Project } from '@app/common/database';

@ApiTags('Projects')
@UseGuards(JwtGuard, RoleGuard)
@ApiBearerAuth()
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Get all projects from database' })
  @ApiResponse({ status: 200, type: [Project] })
  @ApiResponse({
    status: 404,
    description: 'Entities of type: Project not found',
  })
  @Roles(RolesEnum.ADMIN)
  @Get('all')
  public async getAll() {
    return await this.projectService.getAll();
  }

  @ApiOperation({ summary: 'Get all projects of current user' })
  @ApiResponse({ status: 200, type: Project })
  @ApiResponse({
    status: 404,
    description: 'Entities of type: Project not found',
  })
  @Roles(RolesEnum.USER)
  @Get()
  public async getAllByUser(@CurrentUser('sub') managerId: string) {
    return await this.projectService.getAllbyUser(managerId);
  }

  @ApiOperation({ summary: 'Get project by its uuid' })
  @ApiResponse({ status: 200, type: Project })
  @ApiResponse({ status: 404, description: 'Entities not found by id' })
  @Roles(RolesEnum.PROJECT_MANAGER)
  @Get(':id')
  public async getById(@Param('id') id: string, @CurrentUser('sub') managerId: string) {
    return await this.projectService.getById(id, managerId);
  }

  @ApiOperation({ summary: 'Create new project' })
  @ApiResponse({ status: 201, type: Project })
  @ApiResponse({ status: 403, description: 'Project already exists' })
  @ApiResponse({ status: 400, description: 'Body is not correct' })
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesEnum.USER)
  @Post()
  public async create(
    @Body() dto: CreateProjectDto,
    @CurrentUser('sub') managerId: string,
  ) {
    return await this.projectService.create(dto, managerId);
  }

  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({ status: 201, type: Project })
  @ApiResponse({ status: 400, description: 'Body is not correct' })
  @ApiResponse({ status: 404, description: 'Entities not found by id' })
  @Roles(RolesEnum.PROJECT_MANAGER)
  @Patch(':id')
  public async update(@Body() dto: UpdateProjectDto, @Param('id') id: string, @CurrentUser('sub') managerId: string) {
    return await this.projectService.update(dto, id, managerId);
  }

  @ApiOperation({ summary: 'Delete project by his uuid' })
  @ApiResponse({ status: 204, description: 'Project deleted' })
  @ApiResponse({ status: 404, description: 'Project not found by id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(RolesEnum.PROJECT_MANAGER)
  @Delete(':id')
  public async delete(@Param('id') id: string, @CurrentUser('sub') managerId: string) {
    return await this.projectService.delete(id, managerId);
  }
}

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from '@app/common/guards';
import { TeamService } from './team.service';
import { CurrentUser, Roles } from '@app/common/decorators';
import { RolesEnum } from '@app/common/enums';
import { Team } from '@app/common/database';
import { CreateTeamDto, UpdateTeamDto } from './dto';

@ApiTags('Team')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: 'Get all teams' })
  @ApiResponse({ status: 200, type: [Team] })
  @ApiResponse({ status: 404, description: 'Entities of type: Team not found' })
  @Roles(RolesEnum.ADMIN)
  @Get('all')
  public async getAll() {
    return await this.teamService.getAll();
  }

  @ApiOperation({ summary: 'Get team by id' })
  @ApiResponse({ status: 200, type: Team })
  @ApiResponse({ status: 404, description: 'Entity not found by id' })
  @Roles(RolesEnum.PROJECT_MANAGER)
  @Get(':id')
  public async getById(@Param('id') id: string, @CurrentUser('sub') managerId: string) {
    return await this.teamService.getById(id, managerId);
  }

  @ApiOperation({ summary: 'Create team' })
  @ApiResponse({ status: 201, type: Team })
  @ApiResponse({ status: 403, description: 'Team on this project already exists' })
  @ApiResponse({ status: 400, description: 'Body is not correct' })
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesEnum.PROJECT_MANAGER)
  @Post()
  public async create(@Body() dto: CreateTeamDto, @CurrentUser('sub') managerId: string) {
    return await this.teamService.create(dto, managerId);
  }

  @ApiOperation({ summary: 'Create team' })
  @ApiResponse({ status: 201, type: Team })
  @ApiResponse({ status: 404, description: 'Team not found' })
  @ApiResponse({ status: 400, description: 'Body is not correct' })
  @Roles(RolesEnum.PROJECT_MANAGER)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTeamDto, @CurrentUser('sub') managerId: string) {
    return await this.teamService.update(id, dto, managerId);
  }

  @ApiOperation({ summary: 'Create team' })
  @ApiResponse({ status: 204, description: 'Team deleted' })
  @ApiResponse({ status: 404, description: 'Team not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(RolesEnum.PROJECT_MANAGER)
  @Delete(':id')
  public async delete(@Param('id') id: string, @CurrentUser('sub') managerId: string) {
    return await this.teamService.delete(id, managerId);
  }
}

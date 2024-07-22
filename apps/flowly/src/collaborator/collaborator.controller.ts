import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from '@app/common/guards';
import { CurrentUser, Roles } from '@app/common/decorators';
import { RolesEnum } from '@app/common/enums';
import { CollaboratorService } from './collaborator.service';
import { Collaborator } from '@app/common/database';
import { AddCollaboratorDto } from './dto';

@ApiTags('Collaborators')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Roles(RolesEnum.TEAMLEAD)
@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @ApiOperation({ description: 'Get all collaborators in team' })
  @ApiResponse({ status: 200, type: [Collaborator] })
  @ApiResponse({ status: 404, description: 'Collaborators not found' })
  @Get()
  public async getAll(
    @CurrentUser('sub') teamLeadId: string,
    @Body('teamId') teamId: string,
  ) {
    return await this.collaboratorService.getAll(teamLeadId, teamId);
  }

  @ApiOperation({ description: 'Get collaborator by id' })
  @ApiResponse({ status: 200, type: Collaborator })
  @ApiResponse({ status: 404, description: 'Collaborator not found' })
  @Get(':id')
  public async getById(
    @Param('id') id: string,
    @CurrentUser('sub') teamLeadId: string,
    @Body('teamId') teamId: string,
  ) {
    return await this.collaboratorService.getById(id, teamLeadId, teamId);
  }

  @ApiOperation({ description: 'Add new collaborator to the team' })
  @ApiResponse({ status: 201, type: Collaborator })
  @ApiResponse({ status: 400, description: 'Body is not correct' })
  @ApiResponse({ status: 403, description: 'Collaborator already in the team' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async add(
    @Body() dto: AddCollaboratorDto,
    @CurrentUser('sub') teamLeaderId: string,
  ) {
    return await this.collaboratorService.add(dto, teamLeaderId);
  }

  @ApiOperation({ description: 'Delete collaborator' })
  @ApiResponse({
    status: 204,
    description: 'Collaborator deleted from project',
  })
  @ApiResponse({ status: 404, description: 'Collaborator not found by id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(
    @Param('id') id: string,
    @CurrentUser('sub') teamLeaderId: string,
    @Body('teamId') teamId: string,
  ) {
    return await this.collaboratorService.delete(id, teamLeaderId, teamId);
  }
}

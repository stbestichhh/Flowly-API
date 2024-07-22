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
import { JwtGuard, RoleGuard } from '@app/common/guards';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Task } from '@app/common/database';
import { RolesEnum } from '@app/common/enums';
import { CurrentUser, Roles } from '@app/common/decorators';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @ApiOperation({ description: 'Get task by uuid' })
  @ApiResponse({ status: 200, type: Task })
  @ApiResponse({ status: 404, description: 'Entity not found by id' })
  @Roles(RolesEnum.COLLABORATOR, RolesEnum.TEAMLEAD)
  @Get(':id')
  public async getById(
    @Param('id') id: string,
    @CurrentUser('sub') userId: string,
  ) {
    return await this.taskService.getById(id, userId);
  }

  @ApiOperation({ description: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created' })
  @ApiResponse({ status: 400, description: 'Body is not correct' })
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesEnum.TEAMLEAD)
  @Post()
  public async create(
    @Body() dto: CreateTaskDto,
    @CurrentUser('sub') teamLeadId: string,
  ) {
    return await this.taskService.create(dto, teamLeadId);
  }

  @ApiOperation({ description: 'Update task' })
  @ApiResponse({ status: 200, description: 'Task updated' })
  @ApiResponse({ status: 400, description: 'Body is not correct' })
  @ApiResponse({ status: 404, description: 'Entity not found by id' })
  @Roles(RolesEnum.TEAMLEAD)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @CurrentUser('sub') teamLeadId: string,
  ) {
    return await this.taskService.update(id, dto, teamLeadId);
  }

  @ApiOperation({ description: 'Mark task as completed' })
  @ApiResponse({ status: 200, description: 'Task marked as completed' })
  @ApiResponse({ status: 404, description: 'Entity not found by id' })
  @Roles(RolesEnum.COLLABORATOR, RolesEnum.TEAMLEAD)
  @Patch(':id/complete')
  public async completeTask(
    @Param(':id') id: string,
    @CurrentUser('sub') userId: string,
  ) {
    return await this.taskService.completeTask(id, userId);
  }

  @ApiOperation({ description: 'Delete task' })
  @ApiResponse({ status: 204, description: 'Task deleted' })
  @ApiResponse({ status: 404, description: 'Entity not found by id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(RolesEnum.TEAMLEAD)
  @Delete(':id')
  public async delete(
    @Param('id') id: string,
    @CurrentUser('sub') teamLeadId: string,
  ) {
    return await this.taskService.delete(id, teamLeadId);
  }
}

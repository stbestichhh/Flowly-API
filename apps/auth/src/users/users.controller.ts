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
  Query, UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@app/common/database';
import { WhereOptions } from 'sequelize';
import { AuthGuard } from '@app/common/guards';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('auth/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get user by his properties' })
  @ApiQuery({
    name: 'email',
    example: 'brave_plant@garden.com',
    description: 'Find user by his properties',
  })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'User not found by: email' })
  @Get('search')
  async getByOptions(@Query() options: WhereOptions<User>) {
    return await this.userService.getOne(options);
  }

  @ApiOperation({ summary: 'Get user by his uuid' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: `User not found by id` })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiResponse({ status: 404, description: 'Entities of type: User not found' })
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 403, description: 'User already exists' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Update user by his uuid' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(id, dto);
  }

  @ApiOperation({ summary: 'Get user by his uuid' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}

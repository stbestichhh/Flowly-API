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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@app/common/database';
import { WhereOptions } from 'sequelize';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get user by his properties' })
  @ApiBody({ examples: { findExample: { summary: 'Find user by his email', value: { email: 'brave_plant@garden.com' } }}, description: 'Specific user properties' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'User not found by: email' })
  @Get('user')
  getByOptions(@Body() options: WhereOptions<User>) {
    return this.userService.getOne(options);
  }

  @ApiOperation({ summary: 'Get user by his uuid' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: `User not found by id` })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiResponse({ status: 404, description: 'Entities of type: User not found' })
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 403, description: 'User already exists' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Update user by his uuid' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @ApiOperation({ summary: 'Get user by his uuid' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}

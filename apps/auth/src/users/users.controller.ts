import {
  Body,
  Controller,
  Delete,
  Get, HttpCode, HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get user by his uuid' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getById(@Param() id: string) {
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: User })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Update user by his uuid' })
  @ApiResponse({ status: 200, type: User })
  @Patch(':id')
  update(@Param() id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @ApiOperation({ summary: 'Get user by his uuid' })
  @ApiResponse({ status: 204 })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param() id: string) {
    return this.userService.delete(id);
  }
}

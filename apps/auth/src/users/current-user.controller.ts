import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@app/common/decorators/role.decorator';
import { RolesEnum } from '@app/common/enums';
import { AuthGuard, RoleGuard } from '@app/common/guards';
import { UpdateUserDto } from './dto';
import { User } from '@app/common/database';
import { CurrentUser } from '@app/common/decorators';

@ApiTags('Current user')
@Roles(
  RolesEnum.ADMIN,
  RolesEnum.PROJECT_MANAGER,
  RolesEnum.TEAMLEAD,
  RolesEnum.COLLABORATOR,
  RolesEnum.USER,
)
@UseGuards(AuthGuard, RoleGuard)
@ApiBearerAuth()
@Controller('user/me')
export class CurrentUserController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get currently logged in user' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'User not found by id' })
  @Get()
  public async getCurrentUser(@CurrentUser('sub') id: string) {
    return await this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Get currently logged in user' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'User not found by id' })
  @ApiResponse({ status: 400, description: 'Body is not correct' })
  @Patch()
  public async updateCurrentUser(
    @CurrentUser('sub') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.userService.update(id, dto);
  }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@app/common/database';
import { CreateUserDto } from './users/dto';
import { LocalGuard } from './guards';
import { CurrentUser } from '@app/common/decorators';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public get() {
    return 'Hello';
  }

  @ApiOperation({ summary: 'Create new account' })
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 403, description: 'User already exists' })
  @ApiResponse({ status: 400, description: 'Body is not correct' })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  public async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'Login to account' })
  @ApiResponse({
    status: 200,
    content: { response: { example: { authentication_token: 'token' } } },
  })
  @ApiResponse({ status: 403, description: 'Credentials are incorrect' })
  @ApiResponse({ status: 400, description: 'Body is not correct' })
  @UseGuards(LocalGuard)
  @Post('signin')
  public async signin(@CurrentUser() user: User) {
    return await this.authService.signin(user);
  }
}

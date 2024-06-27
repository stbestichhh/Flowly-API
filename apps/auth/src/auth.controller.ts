import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@app/common/database';
import { CreateUserDto } from './users/dto';
import { SigninDto } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create new account' })
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 403, description: 'User already exists' })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'Login to account' })
  @ApiResponse({
    status: 200,
    content: { response: { example: { authentication_token: 'token' } } },
  })
  @ApiResponse({ status: 403, description: 'Credentials are incorrect' })
  @Post('signin')
  async signin(@Body() dto: SigninDto) {
    return await this.authService.signin(dto);
  }
}

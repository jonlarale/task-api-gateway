import { Controller, Post, Body } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from '../users/dto/user.dto';
import { ErrorResponseDto } from 'src/common/dtos/error-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthCmd } from './enums/auth-cmd.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('MANAGEMENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('signup')
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  create(@Body() createAuthDto: CreateUserDto) {
    return this.client.send(AuthCmd.SIGN_UP, {
      ...createAuthDto,
    });
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send(AuthCmd.LOGIN, {
      ...loginUserDto,
    });
  }
}

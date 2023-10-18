import {
  Controller,
  Get,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/users/dto/user.dto';
import { ErrorResponseDto } from 'src/common/dtos/error-response.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserCmd } from './enums/user-cmd.enum';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    @Inject('MANAGEMENT_SERVICE') private readonly client: ClientProxy,
  ) {}
  @Get()
  @Auth(ValidRoles.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: [User],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send(UserCmd.GET_ALL, { paginationDto });
  }

  @Get(':id')
  @Auth(ValidRoles.ADMIN, ValidRoles.USER)
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.client.send(UserCmd.GET_ONE, {
      id,
    });
  }

  @Patch(':id')
  @Auth(ValidRoles.USER)
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.client.send(UserCmd.UPDATE, {
      id,
      updateUserDto,
    });
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN)
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send(UserCmd.DELETE, {
      id,
    });
  }

  @Patch(':id/activate')
  @Auth(ValidRoles.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'User status updated successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  activate(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('activated') activated: boolean,
  ) {
    return this.client.send(UserCmd.ACTIVATE, {
      id,
      activated,
    });
  }

  @Patch(':id/roles')
  @Auth(ValidRoles.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'User roles updated successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  updateRoles(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRolesDto: UpdateRolesDto,
  ) {
    return this.client.send(UserCmd.UPDATE_ROLES, {
      id,
      updateRolesDto,
    });
  }
}

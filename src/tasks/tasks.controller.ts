import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ErrorResponseDto } from 'src/common/dtos/error-response.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { TaskCmd } from './enums/task-cmd.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/enums/valid-roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(
    @Inject('MANAGEMENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: CreateTaskDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser(['id']) userId: string,
  ) {
    return this.client.send(TaskCmd.CREATE, {
      createTaskDto,
      userId,
    });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully',
    type: [CreateTaskDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Auth(ValidRoles.USER)
  findAll(
    @Query() paginationDto: PaginationDto,
    @GetUser(['id']) userId: string,
  ) {
    return this.client.send(TaskCmd.GET_ALL, {
      paginationDto,
      userId,
    });
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
    type: CreateTaskDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser(['id']) userId: string,
  ) {
    return this.client.send(TaskCmd.GET_ONE, {
      id,
      userId,
    });
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: CreateTaskDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser(['id']) userId: string,
  ) {
    return this.client.send(TaskCmd.UPDATE, {
      id,
      updateTaskDto,
      userId,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Task deleted successfully',
    type: null,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser(['id']) userId: string,
  ) {
    return this.client.send(TaskCmd.DELETE, {
      id,
      userId,
    });
  }
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
  IsArray,
  IsDate,
} from 'class-validator';

export class User {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier for a user',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'The first surname of the user' })
  @IsString()
  firstSurname: string;

  @ApiPropertyOptional({
    example: 'Smith',
    description: 'The last surname of the user (optional)',
  })
  @IsOptional()
  @IsString()
  lastSurname?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '2023-10-10T08:07:59.120Z',
    description: 'The date and time when the user was created',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: '2023-10-10T08:07:59.120Z',
    description: 'The date and time when the user was last updated',
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    example: true,
    description: 'Whether the user is activated or not',
  })
  @IsBoolean()
  activated: boolean;

  @ApiPropertyOptional({
    example: '2023-10-10T08:07:59.120Z',
    description: 'The date and time when the user was activated (optional)',
  })
  @IsOptional()
  @IsDate()
  activatedAt?: Date;

  @ApiProperty({
    example: ['user'],
    description: 'The roles assigned to the user',
  })
  @IsArray()
  roles: string[];
}

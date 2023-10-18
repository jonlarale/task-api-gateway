import { applyDecorators } from '@nestjs/common';
import { ValidRoles } from '../enums/valid-roles.enum';
import { RoleProtected } from './role-protected.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard, UserRoleGuard),
  );
}

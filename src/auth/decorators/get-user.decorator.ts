import {
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  console.log(req);
  const user = req.user;

  if (!user) {
    throw new InternalServerErrorException('User not found');
  }
  return data ? user[data] : user;
});

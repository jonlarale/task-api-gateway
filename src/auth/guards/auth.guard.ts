import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AuthCmd } from '../enums/auth-cmd.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('MANAGEMENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');
    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];
    try {
      const user = await firstValueFrom(
        this.client.send(AuthCmd.AUTH_VERIFY, { accessToken: token }),
      );
      if (!user) {
        throw new UnauthorizedException('Token is invalid');
      }
      req['user'] = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

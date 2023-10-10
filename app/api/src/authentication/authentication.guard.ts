import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/authentication/auth-constants';
import { RedismanagerService } from 'src/redismanager/redismanager.service';
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisManagerService: RedismanagerService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.throwUnauthorizedError();
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      if (!payload) {
        this.throwAuthenticationError();
      }
      const keyToken = await this.redisManagerService.getKey(token);
      if (!keyToken) {
        this.throwAuthenticationError();
      }
    } catch (error) {
      this.throwAuthenticationError();
    }
    return true;
  }

  private throwUnauthorizedError() {
    throw new BadRequestException({
      response: 'Unauthorized, please, login.',
    });
  }

  private throwAuthenticationError() {
    throw new UnauthorizedException({
      response: 'Unauthorized, please, login.',
    });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
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
      throw new UnauthorizedException({
        response: 'Unauthorized, please, login.',
      });
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      if (!payload) {
        throw new BadRequestException({
          response: 'Invalid authentication token, please, login.',
        });
      }
      const keyToken = await this.redisManagerService.getKey(token);
      console.log(`keyTOKEN: ${keyToken}`);
      if (!keyToken) {
        throw new BadRequestException({
          response: 'Invalid authentication token, please, login.',
        });
      }
    } catch (error) {
      throw new BadRequestException({
        response: 'Invalid authentication token, please, login.',
      });
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

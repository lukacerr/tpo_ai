import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private secret: string | undefined;

  constructor(private jwtService: JwtService, private reflector: Reflector) {
    this.secret = process.env.API_JWT_SECRET;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isAdminRoute(context: ExecutionContext) {
    return this.reflector.get<boolean>('ADMIN_ONLY', context.getHandler());
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    request['User'] = await this.jwtService
      .verifyAsync(`${token}`, {
        secret: this.secret,
      })
      .catch((e) => {
        throw new UnauthorizedException(e);
      });

    if (this.isAdminRoute(context) && !request['User'].isAdmin)
      throw new UnauthorizedException();

    return true;
  }
}

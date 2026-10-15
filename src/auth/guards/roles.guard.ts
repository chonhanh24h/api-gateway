import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtUser } from '../decorators/current-user.decorator';

/**
 * Guard that enforces role-based access control.
 * Must be applied AFTER JwtAuthGuard so that req.user is already populated.
 *
 * @example
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * @Roles('admin')
 * @Delete(':id')
 * remove() { ... }
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // No roles required — allow through
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user?: JwtUser }>();

    if (!user?.roles || user.roles.length === 0) {
      throw new ForbiddenException('You do not have the required role');
    }

    const hasRole = requiredRoles.some((role) => user.roles!.includes(role));
    if (!hasRole) {
      throw new ForbiddenException(
        'Required role(s): ' + requiredRoles.join(', '),
      );
    }

    return true;
  }
}

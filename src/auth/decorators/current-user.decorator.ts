import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface JwtUser {
  userId: string;
  email: string;
  roles?: string[];
}

/**
 * Parameter decorator that extracts the authenticated user (or a single field)
 * from the request object populated by JwtAuthGuard / JwtStrategy.
 *
 * @example
 * // Get the full user object
 * create(@CurrentUser() user: JwtUser) { ... }
 *
 * @example
 * // Get just the userId
 * create(@CurrentUser('userId') userId: string) { ... }
 */
export const CurrentUser = createParamDecorator(
  (data: keyof JwtUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: JwtUser }>();
    const user = request.user;
    if (!user) return undefined;
    return data ? user[data] : user;
  },
);

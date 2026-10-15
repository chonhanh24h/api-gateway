import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Mark a route handler or controller as publicly accessible,
 * bypassing the JwtAuthGuard entirely.
 *
 * @example
 * \\	s
 * @Public()
 * @Get('health')
 * healthCheck() { ... }
 * \ */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

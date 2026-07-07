import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Post('login')
  login(@Body() data: any) {
    return this.client.send({ cmd: 'login' }, data);
  }

  @Post('register')
  register(@Body() data: any) {
    return this.client.send({ cmd: 'register' }, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: { userId: string } }) {
    return this.client.send(
      { cmd: 'get_profile' },
      { userId: req.user.userId },
    );
  }
}

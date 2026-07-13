import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

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
}

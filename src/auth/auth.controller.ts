import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto, RegisterDto, RegisterRequestOtpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.client.send({ cmd: 'login' }, data);
  }

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.client.send({ cmd: 'register' }, data);
  }

  @Post('register/request-otp')
  requestOtp(@Body() data: RegisterRequestOtpDto) {
    return this.client.send({ cmd: 'request-register-otp' }, data);
  }
}

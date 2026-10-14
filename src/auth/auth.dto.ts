import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterRequestOtpDto {
  @ApiProperty()
  email: string;
}

export class RegisterDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirm_password: string;

  @ApiProperty()
  otp: string;
}

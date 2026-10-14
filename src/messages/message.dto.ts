import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({ required: false, type: String })
  title: string;

  @ApiProperty({ required: false, type: String })
  content: string;
}

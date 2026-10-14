import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessageDto } from './message.dto';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(@Inject('CORE_SERVICE') private client: ClientProxy) {}

  @Get()
  findAll(@Query() query: any) {
    return this.client.send({ cmd: 'get_all_messages' }, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'get_message_by_id' }, id);
  }

  @Post()
  create(@Body() data: MessageDto) {
    return this.client.send({ cmd: 'create_message' }, data);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Record<string, unknown>) {
    return this.client.send(
      { cmd: 'update_message' },
      { id, updateMessageDto: data },
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'remove_message' }, id);
  }
}

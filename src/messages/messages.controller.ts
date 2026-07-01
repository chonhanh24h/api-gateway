import { Controller, Get, Post, Body, Param, Put, Delete, Query, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(@Inject('CORE_SERVICE') private client: ClientProxy) { }

  @Get()
  findAll(@Query() query: any) {
    return this.client.send({ cmd: 'get_all_messages' }, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'get_message_by_id' }, id);
  }

  @Post()
  create(@Body() data: any) {
    return this.client.send({ cmd: 'create_message' }, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.client.send({ cmd: 'update_message' }, { id, updateMessageDto: data });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'remove_message' }, id);
  }
}

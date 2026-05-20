import { Controller, Get, Post, Body, Param, Put, Delete, Query, Inject, UseGuards, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(@Inject('POST_SERVICE') private client: ClientProxy) {}

  @Get()
  findAll(@Query() query: any) {
    return this.client.send({ cmd: 'get_all_posts' }, query);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.client.send({ cmd: 'get_posts_by_user' }, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'get_post_by_id' }, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: any, @Request() req: any) {
    data.userID = req.user.userId;
    return this.client.send({ cmd: 'create_post' }, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.client.send({ cmd: 'update_post' }, { id, updatePostDto: data });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'remove_post' }, id);
  }
}

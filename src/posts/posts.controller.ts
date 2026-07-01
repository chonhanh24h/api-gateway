import { Controller, Get, Post, Body, Param, Put, Delete, Query, Inject, UseGuards, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(@Inject('POST_SERVICE') private client: ClientProxy) { }

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

  /**
   * Step 2 of the S3 upload flow:
   * Receives { fileName, fileType } from the browser and asks post-service
   * to generate a presigned S3 PUT URL.  The browser then PUTs the file
   * directly to S3 without hitting the backend again (Step 3).
   */
  @UseGuards(JwtAuthGuard)
  @Post('upload-url')
  getUploadUrl(@Body() body: { fileName: string; fileType: string }) {
    return this.client.send({ cmd: 'upload_presigned_url' }, body);
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

  @UseGuards(JwtAuthGuard)
  @Get('my-ads/analytic')
  myAdsAnalytic(@Request() req: any) {
    return this.client.send({ cmd: 'my_ads_analytic' }, { userId: req.user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-ads/list')
  myAdsDetails(@Request() req: any, @Query() query: any) {
    return this.client.send({ cmd: 'my_ads' }, { userId: req.user.userId, query });
  }

  @UseGuards(JwtAuthGuard)
  @Put('my-ads/update-status')
  myAdsUpdateStatus(@Request() req: any, @Body() body: any) {
    return this.client.send({ cmd: 'my_ads_update_status' }, { userId: req.user.userId, body });
  }
}


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
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(@Inject('POST_SERVICE') private client: ClientProxy) {}

  /** Public — no token required */
  @Public()
  @Get()
  findAll(@Query() query: Record<string, unknown>) {
    return this.client.send({ cmd: 'get_all_posts' }, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.client.send({ cmd: 'get_posts_by_user' }, userId);
  }

  /** Public — no token required */
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'get_post_by_id' }, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() data: Record<string, unknown>,
    @CurrentUser('userId') userId: string,
  ) {
    const payload = { ...data, userID: userId };
    return this.client.send({ cmd: 'create_post' }, payload);
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
  update(@Param('id') id: string, @Body() data: Record<string, unknown>) {
    return this.client.send(
      { cmd: 'update_post' },
      { id, updatePostDto: data },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'remove_post' }, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-ads/analytic')
  myAdsAnalytic(@CurrentUser('userId') userId: string) {
    return this.client.send({ cmd: 'my_ads_analytic' }, { userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-ads/list')
  myAdsDetails(
    @CurrentUser('userId') userId: string,
    @Query() query: Record<string, unknown>,
  ) {
    return this.client.send({ cmd: 'my_ads' }, { userId, query });
  }

  @UseGuards(JwtAuthGuard)
  @Put('my-ads/update-status')
  myAdsUpdateStatus(
    @CurrentUser('userId') userId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.client.send({ cmd: 'my_ads_update_status' }, { userId, body });
  }
}

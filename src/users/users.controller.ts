import { Controller, Get, Put, Body, Query, Inject, UseGuards, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('account')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  // ==================== My Ads ====================

  @UseGuards(JwtAuthGuard)
  @Get('myads/analytic')
  myAdsAnalytic(@Request() req: any) {
    return this.client.send({ cmd: 'my_ads_analytic' }, { userId: req.user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('myads/details')
  myAdsDetails(@Request() req: any, @Query() query: any) {
    return this.client.send({ cmd: 'my_ads_details' }, { userId: req.user.userId, query });
  }

  @UseGuards(JwtAuthGuard)
  @Put('myads/updateStatus')
  myAdsUpdateStatus(@Request() req: any, @Body() body: any) {
    return this.client.send({ cmd: 'my_ads_update_status' }, { userId: req.user.userId, body });
  }

  @UseGuards(JwtAuthGuard)
  @Put('myads/updateTime')
  myAdsUpdateTime(@Request() req: any, @Body() body: any) {
    return this.client.send({ cmd: 'my_ads_update_time' }, { body });
  }

  // ==================== My Profile ====================

  @UseGuards(JwtAuthGuard)
  @Put('profile/update')
  putMyInfo(@Request() req: any, @Body() body: any) {
    return this.client.send({ cmd: 'put_my_info' }, { userId: req.user.userId, body });
  }

  // ==================== Favorite ====================

  @UseGuards(JwtAuthGuard)
  @Get('myfavorite')
  getFavorite(@Request() req: any, @Query() query: any) {
    return this.client.send({ cmd: 'get_favorite' }, { userId: req.user.userId, query });
  }

  @UseGuards(JwtAuthGuard)
  @Put('myfavorite/save')
  saveFavorite(@Request() req: any, @Body() body: any) {
    return this.client.send({ cmd: 'save_favorite' }, { userId: req.user.userId, body });
  }

  @UseGuards(JwtAuthGuard)
  @Put('myfavorite/unsave')
  unSaveFavorite(@Request() req: any, @Body() body: any) {
    return this.client.send({ cmd: 'unsave_favorite' }, { userId: req.user.userId, body });
  }

  @UseGuards(JwtAuthGuard)
  @Put('myfavorite/unsaveall')
  unSaveAllFavorite(@Request() req: any) {
    return this.client.send({ cmd: 'unsave_all_favorite' }, { userId: req.user.userId });
  }

  // ==================== Search ====================

  @UseGuards(JwtAuthGuard)
  @Get('mysearch')
  getSearch(@Request() req: any, @Query() query: any) {
    return this.client.send({ cmd: 'get_search' }, { userId: req.user.userId, query });
  }

  @UseGuards(JwtAuthGuard)
  @Put('mysearch/save')
  saveSearch(@Request() req: any, @Body() body: any) {
    return this.client.send({ cmd: 'save_search' }, { userId: req.user.userId, body });
  }

  @UseGuards(JwtAuthGuard)
  @Put('mysearch/unsave')
  unSaveSearch(@Request() req: any, @Body() body: any) {
    return this.client.send({ cmd: 'unsave_search' }, { userId: req.user.userId, body });
  }

  @UseGuards(JwtAuthGuard)
  @Put('mysearch/unsaveall')
  unSaveAllSearch(@Request() req: any) {
    return this.client.send({ cmd: 'unsave_all_search' }, { userId: req.user.userId });
  }
}

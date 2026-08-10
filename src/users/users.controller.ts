import {
  Controller,
  Get,
  Put,
  Body,
  Query,
  Inject,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('account')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @UseGuards(JwtAuthGuard)
  @Put('profile/update')
  putMyInfo(
    @Request() req: { user: { userId: string } },
    @Body() body: Record<string, unknown>,
  ) {
    return this.client.send(
      { cmd: 'put_my_info' },
      { userId: req.user.userId, body },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-favorite')
  getFavorite(
    @Request() req: { user: { userId: string } },
    @Query() query: Record<string, unknown>,
  ) {
    return this.client.send(
      { cmd: 'get_favorite' },
      { userId: req.user.userId, query },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('my-favorite/save')
  saveFavorite(
    @Request() req: { user: { userId: string } },
    @Body() body: Record<string, unknown>,
  ) {
    return this.client.send(
      { cmd: 'save_favorite' },
      { userId: req.user.userId, body },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('my-favorite/unsave')
  unSaveFavorite(
    @Request() req: { user: { userId: string } },
    @Body() body: Record<string, unknown>,
  ) {
    return this.client.send(
      { cmd: 'unsave_favorite' },
      { userId: req.user.userId, body },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('my-favorite/unsave-all')
  unSaveAllFavorite(@Request() req: { user: { userId: string } }) {
    return this.client.send(
      { cmd: 'unsave_all_favorite' },
      { userId: req.user.userId },
    );
  }

  // ==================== Search ====================

  // @UseGuards(JwtAuthGuard)
  // @Get('my-search')
  // getSearch(@Request() req: any, @Query() query: any) {
  //   return this.client.send({ cmd: 'get_search' }, { userId: req.user.userId, query });
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put('my-search/save')
  // saveSearch(@Request() req: any, @Body() body: any) {
  //   return this.client.send({ cmd: 'save_search' }, { userId: req.user.userId, body });
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put('my-search/unsave')
  // unSaveSearch(@Request() req: any, @Body() body: any) {
  //   return this.client.send({ cmd: 'unsave_search' }, { userId: req.user.userId, body });
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put('my-search/unsave-all')
  // unSaveAllSearch(@Request() req: any) {
  //   return this.client.send({ cmd: 'unsave_all_search' }, { userId: req.user.userId });
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: { userId: string } }) {
    return this.client.send(
      { cmd: 'get_profile' },
      { userId: req.user.userId },
    );
  }
}

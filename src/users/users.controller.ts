import {
  Controller,
  Get,
  Put,
  Body,
  Query,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Put('profile/update')
  putMyInfo(
    @CurrentUser('userId') userId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.client.send({ cmd: 'put_my_info' }, { userId, body });
  }

  @Get('my-favorite')
  getFavorite(
    @CurrentUser('userId') userId: string,
    @Query() query: Record<string, unknown>,
  ) {
    return this.client.send({ cmd: 'get_favorite' }, { userId, query });
  }

  @Put('my-favorite/save')
  saveFavorite(
    @CurrentUser('userId') userId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.client.send({ cmd: 'save_favorite' }, { userId, body });
  }

  @Put('my-favorite/unsave')
  unSaveFavorite(
    @CurrentUser('userId') userId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.client.send({ cmd: 'unsave_favorite' }, { userId, body });
  }

  @Put('my-favorite/unsave-all')
  unSaveAllFavorite(@CurrentUser('userId') userId: string) {
    return this.client.send({ cmd: 'unsave_all_favorite' }, { userId });
  }

  @Get('profile')
  getProfile(@CurrentUser('userId') userId: string) {
    return this.client.send({ cmd: 'get_profile' }, { userId });
  }
}

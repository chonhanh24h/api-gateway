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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('categories')
export class CategoriesController {
  constructor(@Inject('CORE_SERVICE') private client: ClientProxy) {}

  @Get()
  findAll(@Query('parent_id') parentId?: string) {
    return this.client.send({ cmd: 'get_all_categories' }, { parentId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'get_category_by_id' }, id);
  }

  @Post()
  create(@Body() data: any) {
    return this.client.send({ cmd: 'create_category' }, data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Record<string, unknown>) {
    return this.client.send(
      { cmd: 'update_category' },
      { id, updateCategoryDto: data },
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'remove_category' }, id);
  }
}

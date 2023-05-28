import { Controller, Get, Param, Delete } from '@nestjs/common';
import { RouterService } from './router.service';

@Controller('router')
export class RouterController {
  constructor(private readonly routerService: RouterService) {}

  @Get()
  findAll() {
    return this.routerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routerService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routerService.remove(id);
  }
}

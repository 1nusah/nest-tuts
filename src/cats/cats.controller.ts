import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getAllCats(): string {
    return this.catsService.findAll();
  }

  @Get(':id')
  getOneCat(@Param('id') id: string): string {
    console.log('id', id);
    return this.catsService.findOne(id);
  }

  @Delete(':id')
  deleteCat(@Param('id') id: string): string {
    console.log('id', id);
    return this.catsService.deleteOne(id);
  }
}

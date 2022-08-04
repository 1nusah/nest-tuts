import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsEntity } from './cats.entity';
import { CreateCatDto } from './cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getAllCats(): Promise<CatsEntity[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async getOneCat(
    @Param('id') id: string,
  ): Promise<{ message: string } | CatsEntity> {
    console.log('id', id);
    const foundCat = await this.catsService.findOne(id);
    console.log('found cat', foundCat);
    if (!foundCat) {
      return { message: `Cat with id: ${id} doesn't exist` };
    }
    return foundCat;
  }

  @Delete(':id')
  async deleteCat(@Param('id') id: string): Promise<void> {
    console.log('id', id);
    return this.catsService.deleteOne(id);
  }

  @Post()
  async createCat(@Body() CreateCatDto: CreateCatDto): Promise<string> {
    console.log('create dto', CreateCatDto);
    return this.catsService.createCat(CreateCatDto);
  }
}

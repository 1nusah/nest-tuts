import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsEntity } from './cats.entity';
import { CreateCatDto } from './cat.dto';
import { Response } from 'express';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { catsValidationSchema } from './cats.validation';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getAllCats(): Promise<CatsEntity[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async getOneCat(@Param('id') id: string, @Res() res: Response) {
    const foundCat = await this.catsService.findOneCat(id);
    console.log('my cat', foundCat);
    if (!foundCat) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Cat with ${id} not found` });
    }
    return res.json(foundCat);
  }

  @Delete(':id')
  async deleteCat(@Param('id') id: string): Promise<void> {
    console.log('id', id);
    return this.catsService.deleteOne(id);
  }

  @Post()
  async createCat(
    @Body(new JoiValidationPipe(catsValidationSchema))
    CreateCatDto: CreateCatDto,
  ): Promise<string> {
    return this.catsService.createCat(CreateCatDto);
  }

  @Patch(':id')
  async updateCatById(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(catsValidationSchema))
    CreateCatDto: CreateCatDto,
  ) {
    return this.catsService.updateOne(id, CreateCatDto);
  }
}

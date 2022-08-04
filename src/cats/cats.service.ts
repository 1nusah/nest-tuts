import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatsEntity } from './cats.entity';
import { Repository } from 'typeorm';
import { CreateCatDto } from './cat.dto';

@Injectable({})
export class CatsService {
  constructor(
    @InjectRepository(CatsEntity)
    private catsRepository: Repository<CatsEntity>,
  ) {}
  findAll(): Promise<CatsEntity[]> {
    return this.catsRepository.find();
  }

  findOne(id: string): Promise<CatsEntity | null> {
    return this.catsRepository.findOneBy({ id });
  }

  async deleteOne(id: string): Promise<void> {
    // return `Delete that cat ${id}`;
    await this.catsRepository.delete(id);
  }

  async createCat(data: CreateCatDto) {
    const cat = new CatsEntity();
    cat.name = data.name;
    cat.age = data.age;
    cat.color = data.color;
    console.log({ cat, data });

    await this.catsRepository.save(cat);
    return 'cat created';
  }
}

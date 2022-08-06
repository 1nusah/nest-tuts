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

  async findAll(): Promise<CatsEntity[]> {
    return await this.catsRepository.find();
  }

  async findOneCat(id: string): Promise<CatsEntity | null> {
    return await this.catsRepository.findOneBy({
      id: id,
    });
  }

  async deleteOne(id: string): Promise<void> {
    await this.catsRepository.delete(id);
  }

  async createCat(data: CreateCatDto) {
    const cat = new CatsEntity();
    cat.name = data.name;
    cat.age = data.age;
    cat.color = data.color;
    const catCreated = await this.catsRepository.save(cat);
    return 'cat successfully created';
  }

  async updateOne(id: string, data: CreateCatDto) {
    const cat = new CatsEntity();
    cat.name = data.name;
    cat.age = data.age;
    cat.color = data.color;
    await this.catsRepository.update(
      {
        id,
      },
      cat,
    );
  }
}

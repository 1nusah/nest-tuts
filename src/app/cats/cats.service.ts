import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatsEntity } from './cats.entity';
import { Repository } from 'typeorm';
import { CreateCatDto } from './cat.dto';
import { ObjectId } from 'mongodb';
import { CatsQuery } from './cats.type';

@Injectable({})
export class CatsService {
  constructor(
    @InjectRepository(CatsEntity)
    private catsRepository: Repository<CatsEntity>,
  ) {}

  async findAll(query?: CatsQuery) {
    const page = query?.page ? Number(query.page) : 1;
    const limit = query?.limit ? Number(query.limit) : 20;
    let options;
    options = {
      select: ['name', 'age', 'color'],
    };
    if (query.value) {
      options = {
        ...options,
        where: {
          ...options['where'],
          $or: [
            { name: new RegExp(query.value.toString(), 'i') },
            { age: new RegExp(query.value.toString(), 'i') },
            { color: new RegExp(query.value.toString(), 'i') },
          ],
        },
      };
    }

    const skip = (page - 1) * limit;

    const [items, count] = await this.catsRepository.findAndCount({
      ...options,
      skip,
      take: limit,
    });
    const lastPage = Math.ceil(count / limit);
    return {
      items,
      meta: {
        count,
        page,
        limit,
        lastPage,
      },
    };
  }

  async findOneCat(id: string): Promise<CatsEntity | null> {
    return await this.catsRepository.findOne({
      where: { _id: new ObjectId(id) },
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

    const foundCat = await this.findOneCat(id);
    if (!foundCat) {
      throw new NotFoundException();
    }
    await this.catsRepository.update(id, cat);
  }
}

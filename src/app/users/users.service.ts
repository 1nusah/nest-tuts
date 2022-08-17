import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { UsersValidation } from './users.validation';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async signUpUser(data: UsersValidation) {
    const user = new UsersValidation();
    user.password = data.password;
    user.name = data.name;
    console.log({ name: data.name, password: data.password });
    const createdUser = await this.usersRepository.save(user);
    return 'user created succesfully';
  }

  async findUser(name: string) {
    console.log(
      'details',
      await this.usersRepository.findOne({
        where: { name },
      }),
    );
    return await this.usersRepository.findOne({
      where: { name },
    });
  }

  async findAllUsers() {
    return await this.usersRepository.find({});
  }
}

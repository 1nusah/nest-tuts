import { Injectable } from '@nestjs/common';

@Injectable({})
export class CatsService {
  findAll(): string {
    return 'this is all your cats';
  }

  findOne(id: string): string {
    return `This is just one cat ${id} `;
  }

  deleteOne(id: string): string {
    return `Delete that cat ${id}`;
  }
}

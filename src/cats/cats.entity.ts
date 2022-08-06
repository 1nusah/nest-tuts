import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity({ name: 'cats' })
export class CatsEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  age: number;
}

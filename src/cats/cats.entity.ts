import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity({ name: 'cats' })
export class CatsEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  age: number;
}

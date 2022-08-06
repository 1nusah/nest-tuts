import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cats' })
export class CatsEntity extends BaseEntity {
  @ObjectIdColumn({ select: false })
  _id!: ObjectID;

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  age: number;
}

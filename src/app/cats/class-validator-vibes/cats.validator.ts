import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateCatModel {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @Min(0)
  age: number;
}

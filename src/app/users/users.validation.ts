import { IsNotEmpty, IsString } from 'class-validator';

export class UsersValidation {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

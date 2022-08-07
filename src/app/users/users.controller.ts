import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UsersValidation } from './users.validation';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: UsersValidation) {
    return this.usersService.signUpUser(createUserDto);
  }

  @Post('/login')
  login(@Body() signUpDto: UsersValidation) {
    return this.usersService.loginUser(signUpDto);
  }
}

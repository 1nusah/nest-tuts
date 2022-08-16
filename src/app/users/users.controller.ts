import {UsersService} from './users.service';
import {Body, Controller, Get, Post} from '@nestjs/common';
import {UsersValidation} from './users.validation';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post('/signup')
    signUp(@Body() createUserDto: UsersValidation) {
        return this.usersService.signUpUser(createUserDto);
    }

    @Post('/login')
    login(@Body() signUpDto: UsersValidation) {
        return this.usersService.findUser(signUpDto.name);
    }

    @Get('/all')
    findUsers() {
        return this.usersService.findAllUsers();
    }
}

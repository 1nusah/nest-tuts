import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersValidation} from "../users/users.validation";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    async loginUser(@Body() loginDto: UsersValidation) {
        const data = await this.authService.login(loginDto)
        if (data) {
            return
        }

    }

    @Post('/signUp')
    async signUpUser(@Body() loginDto: UsersValidation) {
        await this.authService.signUp(loginDto)
    }
}

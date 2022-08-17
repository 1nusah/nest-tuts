import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersValidation } from '../users/users.validation';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginUser(
    @Body() loginDto: UsersValidation,
    @Request() req,
    @Response() res,
  ) {
    console.log('dto', loginDto);
    const data = await this.authService.login(loginDto);
    if (data) {
      return res.status(HttpStatus.OK).json(data);
    } else
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Invalid credentials' });
  }

  @Post('/signUp')
  async signUpUser(@Body() loginDto: UsersValidation, @Response() res) {
    const data = await this.authService.signUp(loginDto);
    console.log('data', data);
    if (data) {
      return res.status(HttpStatus.CREATED).json({ message: 'User created' });
    } else
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'User creation failed' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

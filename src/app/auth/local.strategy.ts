import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(token: string, @Request() req): Promise<any> {
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const user = await this.authService.validateUser(name, password);
    // console.log({ password, name });
    const user = '';
    console.log(user, 'user');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

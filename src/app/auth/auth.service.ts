import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(name);

    if (user) {
      const matchPassword = await bcrypt.compare(pass, user.password);
      if (matchPassword) {
        const { password, ...result } = user;
        console.log(result);
        return result;
      }
    }
    return null;
  }

  async login(user: { name: string; password: string }) {
    const payload = { name: user.name, password: user.password };
    const foundUser = await this.usersService.findUser(payload.name);

    if (foundUser) {
      const matchPassword = await bcrypt.compare(
        payload.password,
        foundUser.password,
      );
      console.log('match password', matchPassword);

      if (matchPassword) {
        const { password, ...result } = foundUser;
        return {
          access_token: this.jwtService.sign(payload),
          user: result,
        };
      } else {
        return;
      }
    } else {
      return;
    }
  }

  async signUp(user: { name: string; password: string }) {
    const payload = { name: user.name, password: user.password };
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    return await this.usersService.signUpUser({
      name: payload.name,
      password: hashedPassword,
    });
  }
}

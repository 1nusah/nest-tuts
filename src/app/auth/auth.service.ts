import {Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findUser(username);
        if (user && user.password === pass) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: { name: string; password: string }) {
        const payload = {name: user.name, password: user.password};

        const hashedPassword = await bcrypt.hash(payload.password, 10);

        const foundUser = await this.usersService.findUser(payload.name)
        if (foundUser) {
            if (foundUser.password === hashedPassword
            ) {
                return {
                    access_token: this.jwtService.sign(payload, {privateKey: '920020-2-2'}),
                };
            } else {
                return;
            }
        } else {
            throw new NotFoundException()
        }


    }

    async signUp(user: { name: string; password: string }) {
        const payload = {name: user.name, password: user.password};
        const hashedPassword = await bcrypt.hash(payload.password, 10)
        await this.usersService.signUpUser({name: payload.name, password: hashedPassword});

    }
}

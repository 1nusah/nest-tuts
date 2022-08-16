import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
    controllers: [AuthController],
    imports: [UsersModule, PassportModule, JwtModule.register({
        secret: '#900)#))#)#)0#',
        signOptions: {expiresIn: '36000s'}
    })],

    providers: [AuthService, LocalStrategy, JwtService]
})
export class AuthModule {
}

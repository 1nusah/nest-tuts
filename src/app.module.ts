import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './app/cats/cats.module';
import { DogsModule } from './app/dogs/dogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CatsEntity } from './app/cats/cats.entity';
import { UsersModule } from './app/users/users.module';
import { UsersEntity } from './app/users/users.entity';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    CatsModule,
    DogsModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      entities: [CatsEntity, UsersEntity],
      database: 'nest',
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

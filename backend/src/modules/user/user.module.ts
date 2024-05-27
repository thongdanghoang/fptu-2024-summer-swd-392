import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {UsersService} from './users.service';
import {UsersController} from 'src/modules/user/user.controller';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {UserSynchronizeInterceptor} from './userSynchronize.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UserSynchronizeInterceptor
    },
    UsersService
  ],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UserModule {}

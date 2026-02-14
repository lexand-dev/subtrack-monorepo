import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { TransformResponseInterceptor } from '@/common/interceptors/transform-response.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseInterceptors(TransformResponseInterceptor)
  getProfile(@Session() session: UserSession) {
    return { user: session.user };
  }
}

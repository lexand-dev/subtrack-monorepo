import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@subtrack/auth';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule.forRoot({ auth }), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

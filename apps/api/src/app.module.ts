import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@subtrack/auth';

@Module({
  imports: [AuthModule.forRoot({ auth })],
  controllers: [],
  providers: [],
})
export class AppModule {}

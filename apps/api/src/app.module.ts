import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServiceSubscriptionsModule } from './service-subscriptions/service-subscriptions.module';

@Module({
  imports: [UsersModule, ServiceSubscriptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

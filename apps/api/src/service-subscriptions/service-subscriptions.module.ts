import { Module } from '@nestjs/common';
import { ServiceSubscriptionsService } from './service-subscriptions.service';
import { ServiceSubscriptionsController } from './service-subscriptions.controller';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ServiceSubscriptionsController],
  providers: [ServiceSubscriptionsService],
})
export class ServiceSubscriptionsModule {}

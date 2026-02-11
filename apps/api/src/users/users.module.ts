import { ServiceSubscriptionsModule } from '@/service-subscriptions/service-subscriptions.module';
import { ServiceSubscriptionsService } from '@/service-subscriptions/service-subscriptions.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ServiceSubscriptionsModule],
  providers: [ServiceSubscriptionsService],
})
export class UsersModule {}

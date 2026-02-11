import { Module } from '@nestjs/common';
import { ServiceSubscriptionsService } from './service-subscriptions.service';
import { ServiceSubscriptionsController } from './service-subscriptions.controller';

@Module({
  controllers: [ServiceSubscriptionsController],
  providers: [ServiceSubscriptionsService],
})
export class ServiceSubscriptionsModule {}

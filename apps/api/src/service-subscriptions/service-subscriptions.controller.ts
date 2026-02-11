import { Controller } from '@nestjs/common';
import { ServiceSubscriptionsService } from './service-subscriptions.service';

@Controller('service-subscriptions')
export class ServiceSubscriptionsController {
  constructor(private readonly serviceSubscriptionsService: ServiceSubscriptionsService) {}
}

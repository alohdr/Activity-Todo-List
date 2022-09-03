import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { activitiesProviders } from './activities.providers';


@Module({
  providers: [ActivitiesService,...activitiesProviders],
  controllers: [ActivitiesController]
})
export class ActivitiesModule {}

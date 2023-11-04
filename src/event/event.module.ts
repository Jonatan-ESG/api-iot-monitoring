import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EventController } from './event.controller';
import { temperature_eventProviders } from './event.providers';
import { EventService } from './event.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [...temperature_eventProviders, EventService],
  exports: [EventService],
})
export class EventModule {}

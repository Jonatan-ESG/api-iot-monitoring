import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EventModule } from './event/event.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ScheduleModule.forRoot(), EventModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TemperatureEventModule } from './temperature_event/temperature_event.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ScheduleModule.forRoot(), TemperatureEventModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}

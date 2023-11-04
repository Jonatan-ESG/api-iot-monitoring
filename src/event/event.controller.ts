import { Controller, Get, Param, Headers, Body, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { BaseController } from '../common/controller';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { addMonths } from 'date-fns';
import {
  getRandomAffectedEquipment,
  getRandomLocation,
  getRandomManufacturerAndModel,
  getRandomNumber,
  getRandomRegulations,
  getRandomReliability,
  getRandomSensorDescription,
  getRandomSensorId,
  getRandomSensorType,
  getRandomSensorValue,
  getRandomStatus,
} from 'src/common/utils/data.utils';
import { FindAllEventDto } from './dto/find-all.dto';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchDto } from 'src/common/dto/search.dto';

@ApiTags('Event')
@Controller('event')
export class EventController extends BaseController<Event, CreateEventDto, UpdateEventDto> {
  constructor(private readonly temperatureEventService: EventService) {
    super(temperatureEventService);
  }

  @Cron(CronExpression.EVERY_SECOND)
  public generateEvent() {
    try {
      const { sensor_type: SensorType, unit_measure: Unit } = getRandomSensorType();
      const Alert = Date.now() % 13 == 0;
      const SensorID = getRandomSensorId();
      const Location = getRandomLocation();
      const { value: Value, alarmThreshold: AlarmThreshold } = getRandomSensorValue(SensorType);
      const { manufacturer: Manufacturer, model: Model } = getRandomManufacturerAndModel();
      const Description = getRandomSensorDescription(SensorType, Alert);
      const AffectedEquipment = getRandomAffectedEquipment(SensorType);
      const temperatureEvent = {
        Timestamp: new Date(),
        SensorType,
        SensorID: SensorID,
        Location,
        Value: Alert && Value <= AlarmThreshold ? Value + getRandomNumber(5, 10) : Value,
        Unit,
        Status: getRandomStatus(Alert),
        Description,
        Alert,
        Manufacturer,
        Model,
        BatteryLevel: getRandomNumber(0, 100),
        OperatorID: `Operator${getRandomNumber(0, 1500000)}`,
        Reliability: getRandomReliability(),
        Regulations: getRandomRegulations(),
        AffectedEquipment,
        AlarmThreshold,
        SampleRate: getRandomNumber(0, AlarmThreshold),
        MaintenanceSchedule: addMonths(new Date(), getRandomNumber(1, 12)),
      };

      this.temperatureEventService.create(temperatureEvent);
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  @ApiHeader({ name: 'Limit', allowEmptyValue: true, description: 'Record return limit (pagination) example: 10' })
  @ApiHeader({ name: 'Offset', allowEmptyValue: true, description: 'Record offset start (pagination) example: 0' })
  @ApiHeader({ name: 'Order', allowEmptyValue: true, description: 'Event field to order with example: "SensorID" ' })
  @ApiHeader({ name: 'Direction', allowEmptyValue: true, description: 'Order direction ASC (1), DESC (-1) example: -1' })
  @ApiResponse({ type: [FindAllEventDto] })
  @ApiOperation({ summary: 'Gets all events paginated by offset and limit, default 0, 10' })
  @Get()
  async findAllEvents(@Headers() headers: Record<string, string>) {
    try {
      const temperatureEvents = await this.temperatureEventService.findAllEvents(this.getPagination(headers));
      return this.convertEventsToEventsDto(temperatureEvents);
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  @ApiHeader({ name: 'Limit', allowEmptyValue: true, description: 'Record return limit (pagination) example: 10' })
  @ApiHeader({ name: 'Offset', allowEmptyValue: true, description: 'Record offset start (pagination) example: 0' })
  @ApiHeader({ name: 'Order', allowEmptyValue: true, description: 'Event field to order with example: "SensorID" ' })
  @ApiHeader({ name: 'Direction', allowEmptyValue: true, description: 'Order direction ASC (1), DESC (-1) example: -1' })
  @ApiOperation({ summary: 'Gets the total event count' })
  @Get('getTotalRecords')
  getTotalRecords() {
    try {
      return this.temperatureEventService.getTotalRecords();
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  @ApiOperation({ summary: 'Gets all events paginated by offset and limit in the http body filter configuration' })
  @Post('search')
  async searchEvents(@Body() searchDto: SearchDto, @Headers() headers: Record<string, string>) {
    try {
      const temperatureEvent = await this.temperatureEventService.search(searchDto, this.getPagination(headers));
      return this.convertEventsToEventsDto(temperatureEvent);
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  @ApiOperation({ summary: 'Gets the event count in the http body filter configuration' })
  @Post('searchTotalRecords')
  searchTotalRecords(@Body() searchDto: SearchDto, @Headers() headers: Record<string, string>) {
    try {
      return this.temperatureEventService.searchTotalRecords(searchDto, this.getPagination(headers));
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  @ApiOperation({ summary: 'Gets an especific event by EventId' })
  @Get('/:id')
  async findOneEvent(@Param('id') id: string) {
    try {
      const temperatureEvent = await this.temperatureEventService.findOne(+id);
      return this.convertEventsToEventsDto([temperatureEvent])[0];
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  private convertEventsToEventsDto(temperatureEvents: Event[]): FindAllEventDto[] {
    return temperatureEvents.map((temperatureEvent) => {
      const event = new FindAllEventDto();
      event.EventId = temperatureEvent.SensorDataID;
      event.Timestamp = temperatureEvent.Timestamp;
      event.OperatorID = temperatureEvent.OperatorID;
      event.MaintenanceSchedule = temperatureEvent.MaintenanceSchedule;
      event.Sensor = {
        SensorID: temperatureEvent.SensorID,
        SensorType: temperatureEvent.SensorType,
        Location: temperatureEvent.Location,
        Manufacturer: temperatureEvent.Manufacturer,
        Model: temperatureEvent.Model,
        Regulations: temperatureEvent.Regulations,
      };

      event.SensorReading = {
        AffectedEquipment: temperatureEvent.AffectedEquipment,
        SampleRate: temperatureEvent.SampleRate,
        Value: temperatureEvent.Value,
        Unit: temperatureEvent.Unit,
        Description: temperatureEvent.Description,
      };

      event.Status = {
        Alert: temperatureEvent.Alert,
        AlarmThreshold: temperatureEvent.AlarmThreshold,
        BatteryLevel: temperatureEvent.BatteryLevel,
        Status: temperatureEvent.Status,
        Reliability: temperatureEvent.Reliability,
      };

      return event;
    });
  }
}

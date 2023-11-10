import { Inject, Injectable } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { BaseService } from '../common/service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class EventService extends BaseService<Event, CreateEventDto, UpdateEventDto> {
  public findOneId = 'SensorDataID';
  public createDTO = CreateEventDto;
  public updateDTO = UpdateEventDto;
  public relations = [];
  constructor(
    @Inject('EVENT_REPOSITORY')
    private readonly temperatureEventRepository: Repository<Event>,
  ) {
    super(temperatureEventRepository);
  }

  async findAllEvents(paginationDto: PaginationDto): Promise<Event[]> {
    try {
      const { limit = 10, offset = 0, order = '', direction = 'ASC' } = paginationDto;

      const queryBuilder: SelectQueryBuilder<Event> = this.temperatureEventRepository.createQueryBuilder(
        this.temperatureEventRepository.metadata.tableName,
      );
      queryBuilder.take(limit).skip(offset);

      if (order) {
        queryBuilder.orderBy(`${this.temperatureEventRepository.metadata.tableName}.${order}`, direction);
      }

      return await queryBuilder.getMany();
    } catch (error) {
      this.serviceErrorHandler(error);
    }
  }

  async insertEvents(events: Event[]) {
    try {
      return await this.temperatureEventRepository.insert(events);
    } catch (error) {
      this.serviceErrorHandler(error);
    }
  }
}

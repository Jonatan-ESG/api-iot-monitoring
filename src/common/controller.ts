import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Headers, InternalServerErrorException } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { BaseService } from './service';
import { SearchDto } from './dto/search.dto';

@Controller()
export class BaseController<T, GenericCreateDto, GenericUpdateDto> {
  constructor(private readonly service: BaseService<T, GenericCreateDto, GenericUpdateDto>) {}

  // @Post()
  create(@Body() createDto: GenericCreateDto) {
    try {
      return this.service.create(createDto);
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  // @Get()
  findAll(@Headers() headers: Record<string, string>, @Param('id') id = '') {
    try {
      return this.service.findAll(this.getPagination(headers));
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  // @Get('getTotalRecords')
  getTotalRecords() {
    try {
      return this.service.getTotalRecords();
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  // @Delete('batchRemove')
  batchRemove(@Body() searchDto: SearchDto) {
    try {
      return this.service.batchRemove(searchDto);
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  // @Post('search')
  search(@Body() searchDto: SearchDto, @Headers() headers: Record<string, string>) {
    try {
      return this.service.search(searchDto, this.getPagination(headers));
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  // @Post('searchTotalRecords')
  searchTotalRecords(@Body() searchDto: SearchDto, @Headers() headers: Record<string, string>) {
    try {
      return this.service.searchTotalRecords(searchDto, this.getPagination(headers));
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  // @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.service.findOne(+id);
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  // @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: GenericUpdateDto) {
    try {
      return this.service.update(+id, updateDto);
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.service.remove(+id);
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  protected getPagination(headers: Record<string, string>): PaginationDto {
    try {
      const paginationDto: PaginationDto = {
        limit: Number(headers['limit']) || 10,
        offset: Number(headers['offset']) || 0,
      };

      if (headers['order']) {
        paginationDto.order = headers['order'];
        const direction = Number(headers['direction']);
        paginationDto.direction = isNaN(direction) || direction > 0 ? 'ASC' : 'DESC';
      }
      return paginationDto;
    } catch (error) {
      this.constrollerErrorHandler(error);
    }
  }

  protected constrollerErrorHandler(error: any) {
    throw new InternalServerErrorException(
      `Ocurrió un error en el servidor y fue capturado en el controlador. Descripción del error: ${error.number}-${error.message} `,
    );
  }
}

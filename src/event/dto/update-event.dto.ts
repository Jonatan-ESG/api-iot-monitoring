import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsString({ message: `temperature_event_name debería ser un string` })
  @IsNotEmpty({ message: `temperature_event_name no debería estar vacío` })
  @Length(1, 100, { message: `temperature_event_name debe contener entre 1 y 100 caracteres` })
  temperature_event_name: string;
}

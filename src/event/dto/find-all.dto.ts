import { ApiProperty } from '@nestjs/swagger';

class SensorReading {
  @ApiProperty()
  AffectedEquipment: string;
  @ApiProperty()
  SampleRate: number;
  @ApiProperty()
  Value: number;
  @ApiProperty()
  Unit: string;
  @ApiProperty()
  Description: string;
}

class Status {
  @ApiProperty()
  Alert: boolean;
  @ApiProperty()
  AlarmThreshold: number;
  @ApiProperty()
  BatteryLevel: number;
  @ApiProperty()
  Status: string;
  @ApiProperty()
  Reliability: string;
}

class Sensor {
  @ApiProperty()
  SensorID: string;
  @ApiProperty()
  SensorType: string;
  @ApiProperty()
  Location: string;
  @ApiProperty()
  Manufacturer: string;
  Model: string;
  @ApiProperty()
  Regulations: string;
}

export class FindAllEventDto {
  @ApiProperty()
  EventId: number;
  @ApiProperty()
  Timestamp: Date;
  @ApiProperty()
  OperatorID: string;
  @ApiProperty()
  MaintenanceSchedule: Date;

  @ApiProperty({ type: () => Sensor })
  Sensor: Sensor;

  @ApiProperty({ type: () => SensorReading })
  SensorReading: SensorReading;

  @ApiProperty({ type: () => Status })
  Status: Status;
}

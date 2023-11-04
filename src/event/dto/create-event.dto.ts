import { IsNotEmpty, IsString, IsBoolean, IsInt, IsNumber, IsDate } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsDate()
  Timestamp: Date;

  @IsNotEmpty()
  @IsString()
  SensorType: string;

  @IsNotEmpty()
  @IsString()
  SensorID: string;

  @IsString()
  Location: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  Value: number;

  @IsNotEmpty()
  @IsString()
  Unit: string;

  @IsNotEmpty()
  @IsString()
  Status: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  @IsBoolean()
  Alert: boolean;

  @IsNotEmpty()
  @IsString()
  Manufacturer: string;

  @IsNotEmpty()
  @IsString()
  Model: string;

  @IsNotEmpty()
  @IsInt()
  BatteryLevel: number;

  @IsNotEmpty()
  @IsString()
  OperatorID: string;

  @IsNotEmpty()
  @IsString()
  Reliability: string;

  @IsString()
  Regulations: string;

  @IsNotEmpty()
  @IsString()
  AffectedEquipment: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  AlarmThreshold: number;

  @IsNotEmpty()
  @IsInt()
  SampleRate: number;

  @IsDate()
  MaintenanceSchedule: Date;
}

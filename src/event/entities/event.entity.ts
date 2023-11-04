import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Event', { schema: 'IOT' })
export class Event {
  @PrimaryGeneratedColumn()
  SensorDataID: number;

  @Column()
  Timestamp: Date;

  @Column({ length: 50 })
  SensorType: string;

  @Column({ length: 50 })
  SensorID: string;

  @Column({ length: 100 })
  Location: string;

  @Column('decimal', { precision: 10, scale: 2 })
  Value: number;

  @Column({ length: 10 })
  Unit: string;

  @Column({ length: 20 })
  Status: string;

  @Column('nvarchar', { length: 'max' })
  Description: string;

  @Column()
  Alert: boolean;

  @Column({ length: 50 })
  Manufacturer: string;

  @Column({ length: 50 })
  Model: string;

  @Column()
  BatteryLevel: number;

  @Column({ length: 50 })
  OperatorID: string;

  @Column({ length: 20 })
  Reliability: string;

  @Column('nvarchar', { length: 'max' })
  Regulations: string;

  @Column({ length: 50 })
  AffectedEquipment: string;

  @Column('decimal', { precision: 10, scale: 2 })
  AlarmThreshold: number;

  @Column()
  SampleRate: number;

  @Column()
  MaintenanceSchedule: Date;
}

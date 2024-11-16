import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Type } from 'class-transformer';

@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @Type(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Type(() => Date)
  updated_at: Date;
}

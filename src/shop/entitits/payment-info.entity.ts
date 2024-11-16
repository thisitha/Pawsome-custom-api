import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID as the primary key
  @Column()
  account: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  bank: string;
}

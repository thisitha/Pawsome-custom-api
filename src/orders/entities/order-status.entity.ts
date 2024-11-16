import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity'; // Assuming CoreEntity is in common folder
import { Order } from './orders.entity';

@Entity()
export class OrderStatus extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  serial: number;

  @Column()
  slug: string;

  @Column()
  language: string;

  @Column('simple-array')
  translated_languages: string[];
  @OneToMany(() => Order, (order) => order.status)
  orders: Order[];
}

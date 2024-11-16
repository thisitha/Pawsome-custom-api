import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/orders.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { PaymentIntentInfo } from './payment-intent-info.entity';

@Entity()
export class PaymentIntent extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  tracking_number: string;

  @Column()
  payment_gateway: string;

  @OneToOne(() => PaymentIntentInfo, { cascade: true })
  @JoinColumn({ name: 'payment_intent_info_id' })
  payment_intent_info: PaymentIntentInfo;

  // Many-to-One relationship with Order
  @ManyToOne(() => Order, (order) => order.payment_intent)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}


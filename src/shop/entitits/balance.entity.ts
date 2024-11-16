import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Shop } from './shop.entity';
import { PaymentInfo } from './payment-info.entity';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  admin_commission_rate: number;

  @OneToOne(() => Shop, (shop) => shop.balance, { onDelete: 'CASCADE' })
  @JoinColumn()
  shop: Shop;

  @Column('float', { default: 0 })
  total_earnings: number;

  @Column('float', { default: 0 })
  withdrawn_amount: number;

  @Column('float', { default: 0 })
  current_balance: number;

  @OneToOne(() => PaymentInfo, { cascade: true, nullable: true })
  @JoinColumn()
  payment_info: PaymentInfo;
}

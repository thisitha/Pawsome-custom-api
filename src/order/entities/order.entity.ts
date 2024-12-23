import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Address } from './order-address.entity';
import { OrderItem } from './order-items.entity';
import { User } from 'src/auth/entities/user.entity';
// Enums for Order Status
export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

// Enums for Payment Status
export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

// Enums for Payment Methods
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
}

// Enums for Shipping Status
export enum ShippingStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userId, {
    onDelete: 'CASCADE',
    eager: true,
  })
  customer: User;

  // @Column()
  // customerId: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: 'pending',
  })
  status: string;

  // Payment Details
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: 'pending',
  })
  paymentStatus: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: string;

  @Column({ nullable: true })
  transactionId: string;

  // Relationships to Address
  @ManyToOne(() => Address, { cascade: true })
  @JoinColumn({ name: 'billingAddressId' })
  billingAddress: Address;

  @ManyToOne(() => Address, { cascade: true })
  @JoinColumn({ name: 'shippingAddressId' })
  shippingAddress: Address;

  // Shipping Details
  @Column({
    type: 'enum',
    enum: ShippingStatus,
    default: 'pending',
  })
  shippingStatus: string;

  @Column({ nullable: true })
  shippingMethod: string;

  @Column({ nullable: true })
  trackingNumber: string;

  // Total Amount
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];
}

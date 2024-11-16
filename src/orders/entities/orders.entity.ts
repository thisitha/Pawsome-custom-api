import { UserAddress } from 'src/addresses/entities/address.entity';
import { User } from 'src/auth/entities/user.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  OrderProductPivot,
  Product,
} from 'src/products/entities/product.entity';
import { Shop } from 'src/shop/entitits/shop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { OrderStatus } from './order-status.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { PaymentIntent } from 'src/payment-intent/entities/payment-intent.entity';

export enum PaymentGatewayType {
  STRIPE = 'STRIPE',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  CASH = 'CASH',
  FULL_WALLET_PAYMENT = 'FULL_WALLET_PAYMENT',
  PAYPAL = 'PAYPAL',
  RAZORPAY = 'RAZORPAY',
}
export enum OrderStatusType {
  PENDING = 'order-pending',
  PROCESSING = 'order-processing',
  COMPLETED = 'order-completed',
  CANCELLED = 'order-cancelled',
  REFUNDED = 'order-refunded',
  FAILED = 'order-failed',
  AT_LOCAL_FACILITY = 'order-at-local-facility',
  OUT_FOR_DELIVERY = 'order-out-for-delivery',
  //   DEFAULT_ORDER_STATUS = 'order-pending',
}

export enum PaymentStatusType {
  PENDING = 'payment-pending',
  PROCESSING = 'payment-processing',
  SUCCESS = 'payment-success',
  FAILED = 'payment-failed',
  REVERSAL = 'payment-reversal',
  CASH_ON_DELIVERY = 'payment-cash-on-delivery',
  CASH = 'payment-cash',
  WALLET = 'payment-wallet',
  AWAITING_FOR_APPROVAL = 'payment-awaiting-for-approval',
  //   DEFAULT_PAYMENT_STATUS = 'payment-pending',
}

@Entity()
export class Order extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tracking_number: string;

  @Column()
  customer_id: number;

  @Column()
  customer_contact: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @ManyToOne(() => Order, (order) => order.children)
  @JoinColumn({ name: 'parent_order_id' })
  parent_order?: Order;

  @OneToMany(() => Order, (order) => order.parent_order)
  children: Order[];

  @ManyToOne(() => OrderStatus, (status) => status.orders)
  @JoinColumn({ name: 'status' })
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: OrderStatusType,
    default: OrderStatusType.PENDING,
  })
  order_status: OrderStatusType;

  @Column({
    type: 'enum',
    enum: PaymentStatusType,
    default: PaymentStatusType.PENDING,
  })
  payment_status: PaymentStatusType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  sales_tax: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column('decimal', { precision: 10, scale: 2 })
  paid_total: number;

  @Column({ nullable: true })
  payment_id?: string;

  @Column({
    type: 'enum',
    enum: PaymentGatewayType,
    default: PaymentGatewayType.STRIPE,
  })
  payment_gateway: PaymentGatewayType;

  @ManyToOne(() => Coupon, (coupon) => coupon.orders, { nullable: true })
  @JoinColumn({ name: 'coupon_id' })
  coupon?: Coupon;

  @ManyToOne(() => Shop, (shop) => shop.orders)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  discount?: number;

  @Column('decimal', { precision: 10, scale: 2 })
  delivery_fee: number;

  @Column()
  delivery_time: string;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => UserAddress, (address) => address.orders, {
    nullable: false,
  })
  @JoinColumn({ name: 'billing_address_id' })
  billing_address: UserAddress;

  @ManyToOne(() => UserAddress, (address) => address.orders, {
    nullable: false,
  })
  @JoinColumn({ name: 'shipping_address_id' })
  shipping_address: UserAddress;

  @Column()
  language: string;

  @Column('simple-array')
  translated_languages: string[];

  @ManyToOne(() => PaymentIntent, (paymentIntent) => paymentIntent.order, {
    nullable: false,
  })
  @JoinColumn({ name: 'payment_intent_id' })
  payment_intent: PaymentIntent;

  @Column({ nullable: true })
  altered_payment_gateway?: string;
  @OneToMany(() => Review, (review) => review.order)
  reviews: Review[];
  @OneToMany(() => OrderProductPivot, (orderProduct) => orderProduct.order)
  order_products: OrderProductPivot[];
}

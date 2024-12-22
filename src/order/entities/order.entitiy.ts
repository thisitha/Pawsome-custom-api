// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
//   OneToMany,
//   OneToOne,
//   JoinColumn,
// } from 'typeorm';
// import { OrderItem } from './order-items.entity';
// import { Payment } from './order-payments.entitiy';
// import { Shipping } from './order-shipping.entitiy';
// import { Address } from './order-address.entity';

// enum OrderStatus {
//   PENDING = 'pending',
//   CONFIRMED = 'confirmed',
//   PROCESSING = 'processing',
//   SHIPPED = 'shipped',
//   DELIVERED = 'delivered',
//   CANCELLED = 'cancelled',
//   REFUNDED = 'refunded',
// }
// export default OrderStatus;

// @Entity('orders')
// export class Order {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ unique: true })
//   orderNumber: string;

//   @Column({ type: 'uuid' })
//   userId: string;

//   @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
//     cascade: true,
//   })
//   orderItems: OrderItem[];

//   @Column('decimal', { precision: 10, scale: 2 })
//   subtotal: number;

//   @Column('decimal', { precision: 10, scale: 2 })
//   tax: number;

//   @Column('decimal', { precision: 10, scale: 2, default: 0 })
//   discount: number;

//   @Column('decimal', { precision: 10, scale: 2 })
//   shippingCost: number;

//   @Column('decimal', { precision: 10, scale: 2 })
//   total: number;

//   @Column({ length: 3, default: 'USD' })
//   currency: string;

//   @Column({
//     type: 'enum',
//     enum: OrderStatus,
//     default: OrderStatus.PENDING,
//   })
//   status: OrderStatus;

//   @OneToOne(() => Payment, (payment) => payment.order)
//   payment: Payment;

//   @OneToOne(() => Shipping, (shipping) => shipping.order)
//   shipping: Shipping;

//   @OneToOne(() => Address, { eager: true })
//   @JoinColumn({ name: 'billingAddressId' })
//   billingAddress: Promise<Address>;

//   @OneToOne(() => Address, { eager: true })
//   @JoinColumn({ name: 'shippingAddressId' })
//   shippingAddress: Promise<Address>;

//   @Column({ type: 'uuid', nullable: true })
//   shippingAddressId: string;

//   @Column({ nullable: true })
//   customerNotes: string;

//   @Column({ nullable: true })
//   adminNotes: string;

//   @Column({ nullable: true })
//   ipAddress: string;

//   @Column({ nullable: true })
//   userAgent: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @Column({ nullable: true })
//   createdBy: string;

//   @Column({ nullable: true })
//   updatedBy: string;

//   @Column({ default: false })
//   isDeleted: boolean;
// }

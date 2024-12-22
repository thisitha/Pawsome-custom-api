// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   OneToOne,
//   JoinColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Order } from './order.entitiy';

// export enum ShippingStatus {
//   PENDING = 'pending',
//   PROCESSING = 'processing',
//   SHIPPED = 'shipped',
//   DELIVERED = 'delivered',
//   RETURNED = 'returned',
// }

// @Entity('shipping')
// export class Shipping {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @OneToOne(() => Order, (order) => order.shipping)
//   @JoinColumn()
//   order: Order;

//   @Column({ nullable: true })
//   trackingNumber: string;

//   @Column({ nullable: true })
//   carrier: string;

//   @Column({
//     type: 'enum',
//     enum: ShippingStatus,
//     default: ShippingStatus.PENDING,
//   })
//   status: ShippingStatus;

//   @Column({ nullable: true })
//   estimatedDeliveryDate: Date;

//   @Column({ nullable: true })
//   actualDeliveryDate: Date;

//   @Column('simple-json', { nullable: true })
//   trackingHistory: Record<string, any>;

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

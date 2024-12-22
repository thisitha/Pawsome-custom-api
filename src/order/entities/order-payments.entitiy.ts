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

// export enum PaymentStatus {
//   PENDING = 'pending',
//   PROCESSING = 'processing',
//   COMPLETED = 'completed',
//   FAILED = 'failed',
//   REFUNDED = 'refunded',
// }

// export enum PaymentMethod {
//   CREDIT_CARD = 'credit_card',
//   DEBIT_CARD = 'debit_card',
//   BANK_TRANSFER = 'bank_transfer',
//   DIGITAL_WALLET = 'digital_wallet',
//   COD = 'cash_on_delivery',
// }

// @Entity('payments')
// export class Payment {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @OneToOne(() => Order, (order) => order.payment)
//   @JoinColumn()
//   order: Order;

//   @Column('decimal', { precision: 10, scale: 2 })
//   amount: number;

//   @Column({
//     type: 'enum',
//     enum: PaymentStatus,
//     default: PaymentStatus.PENDING,
//   })
//   status: PaymentStatus;

//   @Column({
//     type: 'enum',
//     enum: PaymentMethod,
//   })
//   method: PaymentMethod;

//   @Column({ nullable: true })
//   transactionId: string;

//   @Column({ nullable: true })
//   paymentProvider: string;

//   @Column('simple-json', { nullable: true })
//   paymentDetails: Record<string, any>;

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

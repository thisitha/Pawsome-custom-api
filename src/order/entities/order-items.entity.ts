// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   ManyToOne,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Order } from './order.entitiy';

// @Entity('order_items')
// export class OrderItem {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => Order, (order) => order.orderItems)
//   order: Order;

//   @Column({ type: 'uuid' })
//   productId: string;

//   @Column({ type: 'uuid' })
//   shopId: string;

//   @Column('decimal', { precision: 10, scale: 2 })
//   price: number;

//   @Column()
//   quantity: number;

//   @Column('decimal', { precision: 10, scale: 2 })
//   total: number;

//   @Column({ nullable: true })
//   sku: string;

//   @Column({ nullable: true })
//   productName: string;

//   @Column('simple-json', { nullable: true })
//   productVariants: Record<string, string>;

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

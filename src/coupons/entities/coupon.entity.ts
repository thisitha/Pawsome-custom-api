import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity'; // Assuming CoreEntity is in common folder
import { Attachment } from 'src/common/entities/attachment.entity';
import { Order } from 'src/orders/entities/orders.entity';

export enum CouponType {
  FIXED_COUPON = 'fixed',
  PERCENTAGE_COUPON = 'percentage',
  FREE_SHIPPING_COUPON = 'free_shipping',
}

@Entity()
export class Coupon extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'decimal' })
  minimum_cart_amount: number;

  // Many-to-many relationship with orders (An order can have many coupons)
  @OneToMany(() => Order, (order) => order.coupon)
  orders?: Order[];

  @Column({
    type: 'enum',
    enum: CouponType,
    default: CouponType.FIXED_COUPON,
  })
  type: CouponType;

  // Relation to the Attachment entity for the coupon image
  @ManyToOne(() => Attachment, { nullable: true })
  @JoinColumn({ name: 'image_id' })
  image: Attachment;

  @Column({ default: true })
  is_valid: boolean;

  @Column({ type: 'decimal' })
  amount: number;

  @Column()
  active_from: string;

  @Column()
  expire_at: string;

  @Column()
  language: string;

  @Column('simple-array')
  translated_languages: string[];

  @Column({ nullable: true })
  target?: boolean;

  @Column({ nullable: true })
  shop_id?: number;

  @Column({ default: false })
  is_approve?: boolean;
}

import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Attachment } from 'src/common/entities/attachment.entity';

import { UserAddress } from 'src/addresses/entities/address.entity';
import { User } from 'src/auth/entities/user.entity';

import { Balance } from './balance.entity';
import { ShopSettings } from './shop-settings.entity';
import { Attribute } from 'src/attributes/entities/attribute.entitiy';
import { Review } from 'src/reviews/entities/review.entity';
import { Order } from 'src/orders/entities/orders.entity';

@Entity()
export class Shop extends CoreEntity {
  @Column()
  owner_id: number;

  @ManyToOne(() => User, (user) => user.shops, { eager: true })
  @JoinColumn()
  owner: User;

  @OneToMany(() => User, (user) => user.managed_shop, { nullable: true })
  staffs?: User[];

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: 0 })
  orders_count: number;

  @Column({ default: 0 })
  products_count: number;

  @OneToOne(() => Balance, (balance) => balance.shop, { nullable: true })
  @JoinColumn()
  balance?: Balance;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  description?: string;

  @OneToOne(() => Attachment, { eager: true })
  @JoinColumn()
  cover_image: Attachment;

  @OneToOne(() => Attachment, { eager: true, nullable: true })
  @JoinColumn()
  logo?: Attachment;

  @OneToOne(() => UserAddress, { eager: true })
  @JoinColumn()
  address: UserAddress;

  @OneToOne(() => ShopSettings, { nullable: true })
  @JoinColumn()
  settings?: ShopSettings;

  @Column({ nullable: true })
  distance?: string;

  @Column({ nullable: true })
  lat?: string;

  @Column({ nullable: true })
  lng?: string;

  @OneToMany(() => Attribute, (attribute) => attribute.shop)
  attributes: Attribute[];
  // One-to-many relationship with Review (A shop can have many reviews)
  @OneToMany(() => Review, (review) => review.shop)
  reviews: Review[];
  @OneToMany(() => Order, (order) => order.shop)
  orders: Order[];
}

// @Entity()
// export class Balance {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column('float')
//   admin_commission_rate: number;

//   @OneToOne(() => Shop, (shop) => shop.balance, { onDelete: 'CASCADE' })
//   @JoinColumn()
//   shop: Shop;

//   @Column('float', { default: 0 })
//   total_earnings: number;

//   @Column('float', { default: 0 })
//   withdrawn_amount: number;

//   @Column('float', { default: 0 })
//   current_balance: number;

//   @OneToOne(() => PaymentInfo, { cascade: true, nullable: true })
//   @JoinColumn()
//   payment_info: PaymentInfo;
// }

// @Entity()
// export class PaymentInfo {
//   @Column()
//   account: string;

//   @Column()
//   name: string;

//   @Column()
//   email: string;

//   @Column()
//   bank: string;
// }

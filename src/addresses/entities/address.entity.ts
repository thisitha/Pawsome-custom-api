import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/auth/entities/user.entity';
import { Order } from 'src/orders/entities/orders.entity';

export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID as the primary key
  @Column()
  street_address: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;
  @OneToMany(() => Order, (order) => order.billing_address)
  orders: Order[];
}

@Entity()
export class Address extends CoreEntity {
  @Column()
  title: string;

  @Column({ default: false })
  default: boolean;

  @Column(() => UserAddress)
  address: UserAddress;

  @Column({ type: 'enum', enum: AddressType })
  type: AddressType;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn()
  customer: User;
}

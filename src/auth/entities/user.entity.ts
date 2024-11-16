import { CoreEntity } from 'src/common/entities/core.entity';
import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { Permission } from './permission.entity';
import { Shop } from 'src/shop/entitits/shop.entity';
import { Report } from '../../reviews/entities/reports.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import { Order } from 'src/orders/entities/orders.entity';
// import { Address } from 'src/addresses/entities/address.entity';
// import { Shop } from 'src/shops/entities/shop.entity';
// import { Profile } from './profile.entity';
// import { Permission } from './permission.entity';

@Entity('users')
export class User extends CoreEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false, nullable: true })
  password?: string;

  @OneToOne(() => Profile, { eager: true, cascade: true })
  @JoinColumn()
  profiles?: Profile;

  @OneToMany(() => Shop, (shop) => shop.owner)
  shops?: Shop[];

  @OneToOne(() => Shop, { nullable: true })
  @JoinColumn()
  managed_shop?: Shop;

  @Column({ default: true })
  is_active?: boolean;

  @OneToMany(() => Address, (address) => address.customer)
  addresses?: Address[];
  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'user_permissions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions?: Permission[];

  @Column({ type: 'json', nullable: true })
  wallet?: any;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}

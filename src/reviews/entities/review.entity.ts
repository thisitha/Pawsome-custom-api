import { User } from 'src/auth/entities/user.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import { Product } from 'src/products/entities/product.entity';
import { Shop } from 'src/shop/entitits/shop.entity';
import { Report } from '../../reviews/entities/reports.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Order } from 'src/orders/entities/orders.entity';

@Entity('reviews')
export class Review extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  comment: string;

  // Many-to-one relationship with Shop (A review is linked to a Shop)
  @ManyToOne(() => Shop, (shop) => shop.reviews, { nullable: false })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  // Many-to-one relationship with Order (A review is linked to an Order)
  @ManyToOne(() => Order, (order) => order.reviews, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // Many-to-one relationship with User (A review is linked to a User who wrote it)
  @ManyToOne(() => User, (user) => user.reviews, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // One-to-many relationship with Attachment (A review can have multiple photos)
  @OneToMany(() => Attachment, (attachment) => attachment.review, {
    nullable: true,
    cascade: true,
  })
  photos: Attachment[];

  // Many-to-one relationship with Product (A review is linked to a Product)
  @ManyToOne(() => Product, (product) => product.reviews, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  // One-to-many relationship with Feedback (A review can have many feedbacks)
  @OneToMany(() => Feedback, (feedback) => feedback.review, { nullable: true })
  feedbacks: Feedback[];

  // Many-to-one relationship with Feedback (A review can have a single feedback from the user)
  @ManyToOne(() => Feedback, (feedback) => feedback.review, { nullable: true })
  @JoinColumn({ name: 'my_feedback_id' })
  my_feedback: Feedback;

  @Column({ type: 'int', default: 0 })
  positive_feedbacks_count: number;

  @Column({ type: 'int', default: 0 })
  negative_feedbacks_count: number;

  @Column({ type: 'varchar' })
  shop_id: string;

  @Column({ type: 'varchar', length: 255 })
  variation_option_id: string;

  @Column({ type: 'int', nullable: true })
  abusive_reports_count?: number;

  // One-to-many relationship with Report (A review can have multiple abusive reports)
  @OneToMany(() => Report, (report) => report.review, { nullable: true })
  abusive_reports: Report[];
}

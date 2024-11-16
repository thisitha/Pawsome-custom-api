import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity'; // Adjust path if necessary
import { User } from 'src/auth/entities/user.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Entity('feedbacks')
export class Feedback extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  user_id: string;

  @Column({ type: 'varchar', length: 255 })
  model_type: string;

  @Column({ type: 'varchar', length: 255 })
  model_id: string;

  @Column({ type: 'boolean', nullable: true })
  positive?: boolean;

  @Column({ type: 'boolean', nullable: true })
  negative?: boolean;

  // Relationship with User (Feedback is linked to a User)
  @ManyToOne(() => User, (user) => user.feedbacks, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => Review, (review) => review.feedbacks, { nullable: true })
  @JoinColumn({ name: 'review_id' })
  review: Review;

  // Many-to-one relationship with Review (for the 'my_feedback' reference in Review)
  @ManyToOne(() => Review, (review) => review.my_feedback, { nullable: true })
  @JoinColumn({ name: 'my_feedback_id' })
  review_for_user: Review;

  // You can add additional relations like product, review, or other models as needed.
}

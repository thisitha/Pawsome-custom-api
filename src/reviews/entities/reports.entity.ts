import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { CoreEntity } from 'src/common/entities/core.entity';
import { Review } from 'src/reviews/entities/review.entity'; // Assuming Report could be related to Review (adjust if necessary)
import { User } from 'src/auth/entities/user.entity';

@Entity('reports')
export class Report extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  user_id?: number;

  // Many-to-one relationship with User (A report is created by a User)
  @ManyToOne(() => User, (user) => user.reports, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @Column({ type: 'int' })
  model_id: number;

  @Column({ type: 'varchar', length: 255 })
  model_type: string;

  @Column({ type: 'text' })
  message: string;

  // Optionally, if reports are related to a specific model (e.g., Review or Product)
  // You can extend this by linking to specific models, e.g., Review.
  @ManyToOne(() => Review, (review) => review.abusive_reports, {
    nullable: true,
  })
  @JoinColumn({ name: 'model_id' }) // You can join the model_id to Review or other entities as required
  review?: Review;
}

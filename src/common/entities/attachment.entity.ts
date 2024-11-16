import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Type } from '../../types/entities/type.entity';
import { Product } from 'src/products/entities/product.entity';
import { Review } from 'src/reviews/entities/review.entity';
// import { Type } from 'class-transformer';

@Entity()
export class Attachment extends CoreEntity {
  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ nullable: true })
  original?: string;
  @ManyToOne(() => Type, (Type) => Type.promotional_sliders, {
    nullable: true,
  })
  @JoinColumn({ name: 'type_id' })
  type: Type;
  @ManyToOne(() => Product, (product) => product.gallery, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product?: Product;
  @ManyToOne(() => Review, (review) => review.photos, { nullable: true })
  @JoinColumn({ name: 'review_id' })
  review: Review;
}

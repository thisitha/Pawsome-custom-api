// Adjust the path if necessary

import { CoreEntity } from 'src/common/entities/core.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Attribute } from './attribute.entitiy';
import { Product } from 'src/products/entities/product.entity';

@Entity('attribute_values')
export class AttributeValue extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  shop_id: number;

  @Column({ type: 'varchar', length: 255 })
  value: string;

  @Column({ type: 'varchar', nullable: true })
  meta?: string;

  // Many-to-one relationship with the Attribute entity
  @ManyToOne(() => Attribute, (attribute) => attribute.values, {
    nullable: false,
  })
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;
  @ManyToOne(() => Product, (product) => product.variations, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

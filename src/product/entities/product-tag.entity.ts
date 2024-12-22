import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';
import { Shop } from 'src/shop/entities/shop.entity';

@Entity()
export class ProductTag {
  @ApiProperty({ description: 'The unique identifier for the product tag' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the product tag', example: 'Fresh' })
  @Column()
  name: string;

  @ManyToMany(() => Product, (product) => product.productTag)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => Shop, (shop) => shop.productTags, { lazy: true })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;
}

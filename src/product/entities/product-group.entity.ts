import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';
import { Shop } from 'src/shop/entities/shop.entity';

@Entity()
export class ProductGroup {
  @ApiProperty({ description: 'The unique identifier for the product group' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the product group',
    example: 'Organic',
  })
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.productGroup)
  products: Product[];

  @ManyToOne(() => Shop, (shop) => shop.productGroups, { lazy: true })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;
}

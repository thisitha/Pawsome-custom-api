import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductGroup } from './product-group.entity';
import { ProductTag } from './product-tag.entity';
import { Manufacturer } from './manufacturer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Shop } from 'src/shop/entities/shop.entity';
import { ProductVariation } from './product-variation.entity';

@Entity()
export class Product {
  @ApiProperty({ description: 'The unique identifier for the product' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the product', example: 'Apple' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Fresh red apples',
  })
  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => ProductGroup, (group) => group.products)
  @JoinColumn({ name: 'product_group_id' })
  productGroup: ProductGroup;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products)
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: Manufacturer;

  @ManyToOne(() => ProductTag, (tag) => tag.products)
  @JoinColumn({ name: 'product_tag_id' })
  productTag: ProductTag;
  @ApiProperty({ description: 'The price of the product', example: 2.99 })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ description: 'The quantity available in stock', example: 100 })
  @Column()
  stockQuantity: number;

  @ApiProperty({
    description: 'The image URL of the product',
    example: 'http://example.com/image.jpg',
  })
  @Column({ nullable: true })
  imageUrl?: string;

  @ApiProperty({
    description: 'The weight of the product (in grams)',
    example: 500,
  })
  @Column('int', { nullable: true })
  weight?: number;

  @ApiProperty({
    description: 'The expiration date of the product',
    example: '2025-12-31',
  })
  @Column('date', { nullable: true })
  expirationDate?: string;

  @ApiProperty({
    description: 'Indicates if the product is active for sale',
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Shop, (shop) => shop.products, { lazy: true })
  @JoinColumn({ name: 'shopId' })
  shop: Shop;

  @ApiProperty({ description: 'The date when the product was created' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'The date when the product was last updated' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => ProductVariation, (variation) => variation.product)
  variations: ProductVariation[];
}

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
export class Category {
  @ApiProperty({ description: 'The unique identifier for the category' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the category', example: 'Fruits' })
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToOne(() => Shop, (shop) => shop.categories, { lazy: true })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;
}

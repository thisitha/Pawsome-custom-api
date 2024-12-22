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
export class Manufacturer {
  @ApiProperty({ description: 'The unique identifier for the manufacturer' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the manufacturer',
    example: 'ABC Manufacturing',
  })
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.manufacturer)
  products: Product[];

  @ManyToOne(() => Shop, (shop) => shop.manufacturers, { lazy: true })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;
}

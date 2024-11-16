import { AttributeValue } from 'src/attributes/entities/attribute-value.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/orders.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Shop } from 'src/shop/entitits/shop.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Type } from 'src/types/entities/type.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum ProductStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}

export enum ProductType {
  SIMPLE = 'simple',
  VARIABLE = 'variable',
}

@Entity('products') // Explicitly defining table name
export class Product extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @ManyToOne(() => Type, (type) => type.products)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @Column()
  type_id: number;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.SIMPLE,
  })
  product_type: ProductType;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Tag, (tag) => tag.products)
  @JoinTable()
  tags?: Tag[];

  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.product)
  variations?: AttributeValue[];

  @ManyToOne(() => Shop)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column()
  shop_id: number;

  @ManyToMany(() => Product)
  @JoinTable()
  related_products?: Product[];

  @Column({ type: 'text' })
  description: string;

  @Column({ default: true })
  in_stock: boolean;

  @Column({ default: true })
  is_taxable: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  sale_price?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  max_price?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  min_price?: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sku?: string;

  @OneToMany(() => Attachment, (attachment) => attachment.product)
  gallery?: Attachment[];

  @OneToOne(() => Attachment, { nullable: true })
  @JoinColumn()
  image?: Attachment;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.PUBLISH,
  })
  status: ProductStatus;

  @Column({ type: 'varchar', length: 100, nullable: true })
  height?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  length?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  width?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column()
  quantity: number;

  @Column({ type: 'varchar', length: 50 })
  unit: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  ratings: number;

  @Column({ default: false })
  in_wishlist: boolean;

  @OneToMany(() => Review, (review) => review.product)
  my_review?: Review[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  language?: string;

  @Column({ type: 'json', nullable: true })
  translated_languages?: string[];

  @OneToMany(() => OrderProductPivot, (pivot) => pivot.product)
  pivot: OrderProductPivot[];
  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}

// Pivot Entity for Order-Product Relation
@Entity('order_product_pivot')
export class OrderProductPivot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.pivot)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  @Column({ type: 'int' })
  order_quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ nullable: true })
  variation_option_id?: number;
}

// Variation Entity
@Entity('variations')
export class Variation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 100 })
  sku: string;

  @Column({ default: false })
  is_disable: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  sale_price?: number;

  @Column({ type: 'int' })
  quantity: number;

  @OneToMany(() => VariationOption, (option) => option.variation)
  options: VariationOption[];
}

// VariationOption Entity
@Entity('variation_options')
export class VariationOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  value: string;

  @ManyToOne(() => Variation, (variation) => variation.options)
  variation: Variation;
}

// File Entity
@Entity('files')
export class File extends CoreEntity {
  @Column()
  attachment_id: number;

  @Column()
  fileable_id: number;

  @Column({ type: 'varchar', length: 255 })
  url: string;
}

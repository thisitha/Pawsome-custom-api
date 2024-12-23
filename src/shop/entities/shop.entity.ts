import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/product/entities/category.entity';
import { Manufacturer } from 'src/product/entities/manufacturer.entity';
import { ProductGroup } from 'src/product/entities/product-group.entity';
import { ProductTag } from 'src/product/entities/product-tag.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: 0 })
  totalReviews: number;

  @Column({ default: 0 })
  totalProducts: number;

  @ManyToOne(() => User, (user) => user.userId, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  @OneToMany(() => Category, (category) => category.shop, { lazy: true })
  categories: Category[];

  @OneToMany(() => ProductGroup, (productGroup) => productGroup.shop, {
    lazy: true,
  })
  productGroups: ProductGroup[];

  @OneToMany(() => ProductTag, (productTag) => productTag.shop, { lazy: true })
  productTags: ProductTag[];

  @OneToMany(() => Manufacturer, (manufacturer) => manufacturer.shop, {
    lazy: true,
  })
  manufacturers: Manufacturer[];

  @OneToMany(() => Product, (product) => product.shop, { lazy: true })
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Type } from 'src/types/entities/type.entity';

@Entity('categories')
export class Category extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @ManyToOne(() => Category, (category) => category.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children?: Category[];

  @Column({ type: 'text', nullable: true })
  details?: string;

  @OneToOne(() => Attachment, { nullable: true })
  @JoinColumn()
  image?: Attachment;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon?: string;

  @ManyToOne(() => Type, (type) => type.categories, { nullable: true })
  @JoinColumn({ name: 'type_id' })
  type?: Type;

  @OneToMany(() => Product, (product) => product.categories)
  products?: Product[];

  @Column({ type: 'varchar', length: 50 })
  language: string;

  @Column({ type: 'json', nullable: true })
  translated_languages: string[];
}

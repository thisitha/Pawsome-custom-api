import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { TypeSettings } from './type-settings.entity';

@Entity('types')
export class Type extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @OneToOne(() => Attachment, { nullable: true })
  @JoinColumn()
  image: Attachment;

  @Column({ type: 'varchar', length: 255 })
  icon: string;

  @OneToMany(() => Banner, (banner) => banner.type, {
    nullable: true,
    cascade: true,
  })
  banners?: Banner[];

  @OneToMany(() => Attachment, (attachment) => attachment.type, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  promotional_sliders?: Attachment[];

  @OneToOne(() => TypeSettings, { nullable: true, cascade: true })
  @JoinColumn()
  settings?: TypeSettings;

  @Column({ type: 'varchar', length: 50 })
  language: string;

  @Column({ type: 'json', nullable: true })
  translated_languages: string[];
  @OneToMany(() => Product, (product) => product.type, {
    nullable: true,
    cascade: true,
  })
  products?: Product[];

  @OneToMany(() => Category, (category) => category.type, { nullable: true })
  categories?: Category[];
  @OneToMany(() => Tag, (tag) => tag.type, { nullable: true })
  tags?: Tag[];
}

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @ManyToOne(() => Type, (type) => type.banners)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @OneToOne(() => Attachment, { nullable: false })
  @JoinColumn()
  image: Attachment;
}

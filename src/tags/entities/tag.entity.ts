import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Type } from 'src/types/entities/type.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('tags')
export class Tag extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'int', nullable: true })
  parent?: number;

  @Column({ type: 'text' })
  details: string;

  @OneToOne(() => Attachment, { nullable: true })
  @JoinColumn()
  image: Attachment;

  @Column({ type: 'varchar', length: 255 })
  icon: string;

  @ManyToOne(() => Type, (type) => type.tags, { nullable: true })
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @OneToMany(() => Product, (product) => product.tags)
  products: Product[];

  @Column({ type: 'varchar', length: 50 })
  language: string;

  @Column({ type: 'json', nullable: true })
  translated_languages: string[];
}

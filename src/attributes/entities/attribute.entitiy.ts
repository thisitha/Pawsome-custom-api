import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Shop } from 'src/shop/entitits/shop.entity';
import { AttributeValue } from './attribute-value.entity';

@Entity('attributes')
export class Attribute extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @ManyToOne(() => Shop, (shop) => shop.attributes, { nullable: false })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column({ type: 'varchar' })
  shop_id: string;

  @OneToMany(
    () => AttributeValue,
    (attributeValue) => attributeValue.attribute,
    { cascade: true },
  )
  values: AttributeValue[];

  @Column({ type: 'varchar', length: 50 })
  language: string;

  @Column({ type: 'json', nullable: true })
  translated_languages: string[];
}

import { ShopSocials } from 'src/settings/entities/settings.entity';
import { Location } from 'src/settings/entities/settings.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShopSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID as the primary key
  @Column('json', { nullable: true })
  socials: ShopSocials[];

  @Column()
  contact: string;

  @Column('json', { nullable: true })
  location: Location;

  @Column()
  website: string;
}

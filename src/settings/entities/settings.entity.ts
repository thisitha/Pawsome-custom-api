import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShopSocials {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icon: string;

  @Column()
  url: string;
}

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 6 })
  lat: number;

  @Column('decimal', { precision: 10, scale: 6 })
  lng: number;

  @Column({ nullable: true })
  city?: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  zip?: string;

  @Column()
  formattedAddress: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('type_settings')
export class TypeSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isHome: boolean;

  @Column({ type: 'varchar', length: 50 })
  layoutType: string;

  @Column({ type: 'varchar', length: 50 })
  productCard: string;
}

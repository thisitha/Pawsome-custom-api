import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PaymentIntentInfo extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  client_secret?: string;

  @Column({ nullable: true })
  redirect_url?: string;

  @Column()
  payment_id: string;

  @Column()
  is_redirect: boolean;
}

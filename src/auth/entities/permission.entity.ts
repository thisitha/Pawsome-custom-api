import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column } from 'typeorm';

@Entity('permissions')
export class Permission extends CoreEntity {
  @Column()
  name?: string;

  @Column({ nullable: true })
  guard_name?: string;

  @Column({ type: 'json', nullable: true })
  pivot?: any;
}

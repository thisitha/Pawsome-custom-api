import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';

import { User } from './user.entity';
import { Attachment } from 'src/common/entities/attachment.entity';

@Entity()
export class Social {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  link: string;
}

@Entity()
export class Profile extends CoreEntity {
  @OneToOne(() => Attachment, { nullable: true, cascade: true })
  @JoinColumn()
  avatar?: Attachment;

  @Column({ nullable: true })
  bio?: string;

  @Column('json', { nullable: true })
  socials?: Social[];

  @Column({ nullable: true })
  contact?: string;

  @ManyToOne(() => User, (user) => user.profiles, { nullable: true })
  @JoinColumn()
  customer?: User;
}

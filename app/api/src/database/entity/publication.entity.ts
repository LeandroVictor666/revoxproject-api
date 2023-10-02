import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Publications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'int4', default: 0 })
  likesCounter: number;

  @Column({ type: 'int4', default: 0 })
  commentsCounter: number;

  @Column({ type: 'int4', default: 0 })
  sharesCounter: number;

  @ManyToOne(() => Account, (author) => author.username)
  @JoinColumn({
    name: 'authorUsername',
    foreignKeyConstraintName: 'authorUsername',
    referencedColumnName: 'username',
  })
  authorUsername: string;

  @ManyToOne(() => Account, (author) => author.id)
  @JoinColumn({ name: 'authorId', foreignKeyConstraintName: 'authorId' })
  authorId: Account;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  publicationDate: Date;
}

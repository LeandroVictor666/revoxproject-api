import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  nickname: string;

  @Column({ type: `varchar`, length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  password: string;

  @Column({ type: 'date', nullable: false })
  birthday: Date;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  registerDate: Date;
}

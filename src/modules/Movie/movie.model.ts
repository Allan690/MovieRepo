import {
    BaseEntity,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn, OneToMany
} from 'typeorm';
import { Length, IsString, IsDate, IsUrl } from 'class-validator';
import { User } from '../User/user.model';
import { Booking } from '../Booking/booking.model';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsUrl()
  @Column({ unique: true })
  image: string;

  @Length(3)
  @Column()
  @IsString()
  summary: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  year: string;

  @OneToMany(() => Booking, booking => booking.movie)
  userConnection: Promise<User>;

  @IsDate()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}

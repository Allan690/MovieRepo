import {
    BaseEntity,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { IsEmail, Length, IsString, IsDate } from 'class-validator';
import { Movie } from '../Movie/movie.model';
import { Booking } from '../Booking/booking.model';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Length(3)
  @Column()
  @IsString()
  password: string;

  @OneToMany(() => Booking, booking => booking.user)
  movieConnection: Promise<Movie>;

  @IsDate()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: Date;
}

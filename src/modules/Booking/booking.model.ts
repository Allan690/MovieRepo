import {
    BaseEntity,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';
import { User } from '../User/user.model';
import { Movie } from '../Movie/movie.model';

@Entity()
export class Booking extends BaseEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  movieId: string;

  @ManyToOne(() => User,  user => user.movieConnection,
             { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @ManyToOne(() => Movie,  mov => mov.userConnection,
             { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movieId' })
  movie: Promise<Movie>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}

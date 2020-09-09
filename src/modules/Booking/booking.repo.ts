import { Repository, EntityRepository } from 'typeorm';
import { Booking } from './booking.model';
import { User } from '../User/user.model';
import { Movie } from '../Movie/movie.model';


export interface ICreateBookingInput {
  movieId: string;
  userId: string;
}

@EntityRepository(Booking)
export class BookingRepo extends Repository<Booking> {
    /**
     * fetches all bookings from the model
     * @param userId the user id
     */
  async getAllBookings(userId: string) {
    try {
      const bookings = await this.createQueryBuilder('booking')
          .select(['users.id', 'users.email', 'movie'])
          .innerJoin(User, 'users', 'users.id = :userId', { userId })
          .innerJoin(Movie, 'movie', 'movie.id = booking.movieId')
          .getRawMany();
      return bookings;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * deletes a booking by id
   * @param booking
   */
  async deleteBooking(booking: ICreateBookingInput) {
    try {
      await this.delete(booking);
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * creates a booking
   * @param data
   */
  async createBooking(data: ICreateBookingInput) {
    try {
      const booking = await this.create(data).save();
      if (booking) return true;
    } catch (err) {
      return false;
    }
  }
}

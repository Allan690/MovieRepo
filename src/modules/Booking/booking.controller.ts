import { BookingRepo, ICreateBookingInput } from './booking.repo';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';


class BookingController {
    /**
     * fetches all bookings
     * @param req the express request object
     * @param res the express response object
     */
  static async getBookings(req: Request, res: Response) {
    const bookingRepo = getCustomRepository(BookingRepo);
    const { userId }: any = req.query;
    const bookings = await bookingRepo.getAllBookings(userId);
    return res.status(200).json({ message: 'success', booking: bookings });
  }

  /**
   * Calls the booking service to create a new booking then returns the booking object
   * @param req the express request object
   * @param res the express response object
   */
  static async createBooking(req: Request, res: Response) {
    const bookingRepo = getCustomRepository(BookingRepo);
    const data: ICreateBookingInput = req.body;
    const booking = await bookingRepo.createBooking(data);
    if (booking) {
      const bookings = await bookingRepo.getAllBookings(data.userId);
      return res.status(200).json({ message: 'success', booking: bookings });
    }
  }

  /**
   * Deletes a booking from the system
   * @param req
   * @param res
   */
  static async deleteBooking(req: Request, res: Response) {
    const bookingRepo = getCustomRepository(BookingRepo);
    const data: ICreateBookingInput = req.body;
    const result = await bookingRepo.deleteBooking(data);
    if (result) {
      return res.status(200).json({ message: 'Booking deleted' });
    }
  }
}

export default BookingController;

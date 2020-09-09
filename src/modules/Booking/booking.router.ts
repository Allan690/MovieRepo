import express from 'express';
import BookingController from './booking.controller';
import { isAuth } from '../Auth/auth.middleware';

const bookingRouter = express.Router();

bookingRouter.get(
    '/bookings',
    isAuth,
    BookingController.getBookings
);

bookingRouter.post(
    '/bookings',
    isAuth,
    BookingController.createBooking
);

bookingRouter.delete(
    '/bookings',
    isAuth,
    BookingController.createBooking
);

export default bookingRouter;

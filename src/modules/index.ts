import { Express } from 'express';
import userRouter from './User';
import movieRouter from './Movie';
import bookingRouter from './Booking';

const routes = (app: Express) => {
  app.use(bookingRouter);
  app.use(userRouter);
  app.use(movieRouter);
  return app;
};
export default routes;


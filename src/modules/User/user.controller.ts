import { Request, Response } from 'express';
import { IUserData, UsersRepo } from './user.repo';
import { getCustomRepository } from 'typeorm';
import { User } from './user.model';

export class UserController {
    /**
       * signs up the user
      * @param req the express request object
     * @param res the express response object
     * @returns the user object
     */
  static async signupUser(req: Request, res: Response) {
    const data: IUserData = req.body;
    const userRepo =  getCustomRepository(UsersRepo);
    const user = await userRepo.createUser(data);
    if (!(user instanceof User) && user.status) {
      return res.status(user.status).json({
        message: user.message
      });
    }
    return res.status(200).json({
      user
    });
  }

    /**
     * logs in the user
     * @param req the express request object
     * @param res the express response object
     */
  static async loginUser(req: Request, res: Response) {
    try {
      const data: IUserData = req.body;
      const bookingRepo = getCustomRepository(UsersRepo);
      const { accessToken, userId } = await bookingRepo.loginUser(data);
      return res.status(200).json({
        accessToken, userId
      });
    } catch (err) {
      return res.status(400).json(
          { message: 'Your username/password is incorrect' });
    }
  }
}

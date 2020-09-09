import express from 'express';
import { UserController } from './user.controller';
import validateUser from './user.middleware';

const userRouter = express.Router();

userRouter.post('/signup', validateUser,  UserController.signupUser);
userRouter.post('/login', validateUser,  UserController.loginUser);

export default userRouter;

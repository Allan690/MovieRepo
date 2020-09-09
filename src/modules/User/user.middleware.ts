import { validate } from 'class-validator';
import { UserInput } from './user.input';
import { NextFunction, Request, Response } from 'express';

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const userInput = new UserInput();
  if (!req.body) {
    return res.status(400).json({
      message: 'Request body cannot be empty'
    });
  }
  if (req.body && (!req.body.password || !req.body.email)) {
    return res.status(400).json({
      message: 'Please enter your email and password'
    });
  }
  const { email, password } =  req.body;
  userInput.email = email;
  userInput.password = password;
  validate(userInput).then((errors) => {
    if (errors.length > 0) {
      return res.status(400).json({
        errors
      });
    }
    return next();
  });
};

export default validateUser;

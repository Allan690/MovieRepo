import { NextFunction, Request, Response } from 'express';
import { MovieInput } from './movie.input';
import { validate } from 'class-validator';

/**
 * Middleware that validates incoming movie request to ensure that it is correct
 * @param req the express request object
 * @param res the express response object
 * @param next the next function
 */
const validateMovie = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Request body cannot be empty'
    });
  }
  if (!req.body.image || !req.body.summary || !req.body.year || !req.body.name) {
    return res.status(400).json({
      message: 'Please ensure that you have filled the image url, summary, year and name fields'
    });
  }
  const movieInput = new MovieInput();
  movieInput.image = req.body.image;
  movieInput.name = req.body.name;
  movieInput.summary = req.body.summary;
  movieInput.year = req.body.year;
  validate(movieInput).then((err) => {
    if (err.length > 0) {
      return res.status(400).json({
        err
      });
    }
    return next();
  });
};

export default validateMovie;

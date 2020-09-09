import express from 'express';
import MovieController from './movie.controller';
import { isAuth } from '../Auth/auth.middleware';
import validateMovie from './movie.middleware';

const movieRouter = express.Router();

movieRouter.get(
    '/movies',
    isAuth,
    MovieController.getAllMovies
);

movieRouter.get(
    '/movies/:id',
    isAuth,
    MovieController.getSingleMovie
);


movieRouter.post(
    '/movies',
    isAuth,
    validateMovie,
    MovieController.createMovie
);

movieRouter.delete(
    '/movies/:id',
    isAuth,
    MovieController.deleteMovie
);

export default movieRouter;

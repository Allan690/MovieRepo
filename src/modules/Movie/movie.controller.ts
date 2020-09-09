import { Response, Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { ICreateMovieInput, MovieRepo } from './movie.repo';

class MovieController {
    /**
     * creates a movie
      * @param req
     * @param res
     */
  static async createMovie(req: Request, res: Response) {
    try {
      const data: ICreateMovieInput = req.body;
      const movieRepo =  getCustomRepository(MovieRepo);
      const movie = await movieRepo.createMovie(data);
      return res.status(201).json({
        message: 'success',
        data: movie
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message
      });
    }
  }

    /**
     * fetches all movies
     * @param req
     * @param res
     */
  static async getAllMovies(req: Request, res: Response) {
    try {
      const movieRepo =  getCustomRepository(MovieRepo);
      const movies = await movieRepo.getAllMovies();
      return res.status(200).json({
        message: 'success',
        data: movies
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message
      });
    }
  }

    /**
     * Fetches a single movie
     * @param req
     * @param res
     */
  static async getSingleMovie(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          message: 'ID param missing in the request '
        });
      }
      const { id } = req.params;
      const movieRepo =  getCustomRepository(MovieRepo);
      const movie = await movieRepo.getMovie(id);
      return res.status(200).json({
        message: 'success',
        data: movie
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message
      });
    }
  }

  static async deleteMovie(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          message: 'ID param missing in the request '
        });
      }
      const { id } = req.params;
      const movieRepo =  getCustomRepository(MovieRepo);
      const result = await movieRepo.deleteMovie(id);
      if (result) {
        return res.status(200).json({
          message: 'movie deleted successfully'
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: err.message
      });
    }
  }
}

export default MovieController;

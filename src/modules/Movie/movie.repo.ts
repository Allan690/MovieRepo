import { Repository, EntityRepository } from 'typeorm';
import { Movie } from './movie.model';


export interface ICreateMovieInput {
  image: string;
  summary: string;
  name: string;
  year: string;
}

@EntityRepository(Movie)
export class MovieRepo extends Repository<Movie> {

    /**
     * creates a movie
     * @param data
     */
  async createMovie(data: ICreateMovieInput) {
    try {
      const movie = await this.create(data).save();
      return movie;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * fetches all movies
   */
  async getAllMovies() {
    try {
      const movies = await this.find();
      return movies;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * fetches a single movie by id
   * @param movieId
   */
  async getMovie(movieId: string) {
    try {
      const movie = await this.findOne({ id: movieId.trim() });
      return movie;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * deletes a single movie by id
   * @param movieId
   */
  async deleteMovie(movieId: string) {
    try {
      await this.delete({ id: movieId.trim() });
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}

import { Repository, EntityRepository, QueryFailedError } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from './user.model';
import env from '../../config/environment';

export interface IUserData {
  email: string;
  password: string;
}
const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';


@EntityRepository(User)
export class UsersRepo extends Repository<User> {

  /**
   * Creates a user
   * @param userData the email and password of the user
   */
  async createUser(userData: IUserData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = await this.create({
        email: userData.email,
        password: hashedPassword
      }).save();
      delete user.password;
      return user;
    } catch (err) {
      if (err && err.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        return {
          status: 400,
          message: 'A user with this email already exists. Please login to proceed.',
        };
      }
      return { message: 'There was a problem creating the user', status: 500 };
    }
  }

  /**
   * logs in user to the system
   * @param userData email and password of the user
   */
  async loginUser({ email, password }: IUserData) {
    try {
      const user = await this.findOne({ where: { email } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        const accessToken = sign(
            { userId: user.id, email: user.email }, env.ACCESS_TOKEN_SECRET, {
              expiresIn: '2h'
            });
        return { accessToken, userId: user.id };
      }
    } catch (err) {
      throw new Error('Please enter a valid email/password');
    }
  }
}

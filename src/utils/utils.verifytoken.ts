import { verify } from 'jsonwebtoken';

interface IDecodedToken {
  userId: string;
  email: string;
}

/**
 * @description runs the verify method passing a token and secret as arguments
 * @param token The JWT token to be verified
 * @param secret The secret that will be used to verify the token
 * @returns the verified JWT token
 */
export const verifyToken = async (token: string, secret: any) => {
  const decoded = await verify(token, secret) as IDecodedToken;
  return decoded;
};

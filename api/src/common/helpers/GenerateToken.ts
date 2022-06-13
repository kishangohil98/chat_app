import * as JWT from 'jsonwebtoken';
import { IUser } from '../../entities/interfaces/IUser';
import { IUserPayload } from '../../repositories/interface/IUserRepository';
import { config } from '../../../config';

/**
 * Generate JWT Access Token
 * @param user
 * @returns {Promise<string>}
 */
const generateJWToken = async (user: IUser): Promise<string> => {
  const payload: IUserPayload = {
    user,
  };

  return JWT.sign(payload, config.JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
};

/**
 * Generate JWT Refresh Token
 * @param user
 * @returns {Promise<string>}
 */
const generateJWTRefreshToken = async (user: IUser): Promise<string> => {
  const payload: IUserPayload = {
    user,
  };

  return JWT.sign(payload, config.JWT_REFRESH_SECRET_KEY, {
    expiresIn: '1h',
  });
};

/**
 * Generate both tokens
 * @param user
 */
export const generateUserTokens = async (
  user: IUser,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const accessToken = await generateJWToken(user);
  const refreshToken = await generateJWTRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

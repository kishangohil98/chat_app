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
    expiresIn: 10,
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
  const payload = user;
  payload.accessToken = undefined;
  payload.refreshToken = undefined;

  const accessToken = await generateJWToken(payload);
  const refreshToken = await generateJWTRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
  };
};

import { inject } from 'inversify';
import * as Joi from 'joi';
import { ILogger } from '../../common/logger/ILogger';
import { INVERSIFY_TYPES } from '../../inversify/inversifyTypes';
import { ValidationMiddleware } from '../../middlerware/ValidationMiddleware';

export const UserRegistrationSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(24),
});

export interface IUserRegistrationSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// eslint-disable-next-line max-len
export class UserRegistrationValidationMiddleware extends ValidationMiddleware<IUserRegistrationSchema> {
  constructor(@inject(INVERSIFY_TYPES.Logger) logger: ILogger) {
    super(logger, UserRegistrationSchema);
  }
}

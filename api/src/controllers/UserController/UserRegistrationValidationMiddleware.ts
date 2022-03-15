import { inject } from 'inversify'
import { ILogger } from '../../common/logger/ILogger'
import { INVERSIFY_TYPES } from '../../inversify/inversifyTypes'
import { ValidationMiddleware } from '../../middlerware/ValidationMiddleware'
import * as Joi from 'joi'

export const UserRegistrationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(24),
})

export interface IUserRegistrationSchema {
  email: string
  password: string
}

export class UserRegistrationValidationMiddleware extends ValidationMiddleware<IUserRegistrationSchema> {
  constructor(
    @inject(INVERSIFY_TYPES.Logger)
    logger: ILogger
  ) {
    super(logger, UserRegistrationSchema)
  }
}

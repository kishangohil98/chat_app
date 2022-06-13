import * as express from 'express';
import * as Joi from 'joi';
import { injectable, inject, unmanaged } from 'inversify';
import { expressCb } from './expressCb';
import { ILogger } from '../common/logger/ILogger';
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes';

@injectable()
export abstract class ValidationMiddleware<TBodyType> {
  protected constructor(
    @inject(INVERSIFY_TYPES.Logger)
    private logger: ILogger,
    @unmanaged()
    private validationSchema: Joi.ObjectSchema,
  ) {}

  /**
   * Middleware to validate the request body
   * This implementation uses joi to validate the incoming request body.
   * @returns {expressCb}
   */
  public handler(): expressCb {
    return (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction,
    ): void => {
      // Validating incoming request body
      const validation: Joi.ValidationResult = this.validationSchema.validate(
        request.body,
      );

      if (validation.error) {
        this.logger.error('Request body validation failed');
        response.status(400).json(validation.error.details);
        return;
      }

      this.logger.info('Request body validation suceessful');
      next();
    };
  }
}

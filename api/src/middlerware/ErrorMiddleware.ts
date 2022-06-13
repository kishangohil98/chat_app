import * as express from 'express';
import * as HttpStatus from 'http-status';
import { inject, injectable } from 'inversify';
import { ErrorCode } from '../common/exceptions/ErrorCode';
import { ILogger } from '../common/logger/ILogger';
import { expressErrorCb } from './expressCb';
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes';

@injectable()
export class ErrorMiddleware {
  constructor(
    @inject(INVERSIFY_TYPES.Logger)
    private logger: ILogger,
  ) {}

  /**
   * Middleware to catch all api errors and exceptions
   * it will convert all errors to the standard response format.
   *
   * @returns {expressErrorCb}
   */
  public handler(): expressErrorCb {
    return (
      error: any,
      request: express.Request,
      response: express.Response,
      next: express.NextFunction,
    ) => {
      const status: ErrorCode = error.errorCode || ErrorCode.Undefined;

      this.logger.error(error.message);
      this.logger.error(error);
      const responseBody = [
        {
          message: error.message || 'Something went wrong',
          path: ErrorMiddleware.getPath(error),
          body: error.body,
        },
      ];
      if (status === ErrorCode.Undefined && error.stack) {
        this.logger.error(error.stack);
      }
      const httpStatus = ErrorMiddleware.getCode(status);
      response.status(httpStatus).json(responseBody);
      if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
        next(error);
      }
    };
  }

  private static getPath(error: any): string | undefined {
    let path;
    if (!error.path) {
      path = undefined;
    } else if (error.path && Array.isArray(error.path)) {
      path = error.path;
    } else if (error.path) {
      path = [error.path];
    }

    return path;
  }

  private static getCode(errorCode: ErrorCode): number {
    switch (errorCode) {
      case ErrorCode.Unauthorised:
        return HttpStatus.UNAUTHORIZED;
      case ErrorCode.Forbidden:
        return HttpStatus.FORBIDDEN;
      case ErrorCode.NotFound:
        return HttpStatus.NOT_FOUND;
      case ErrorCode.BadRequest:
        return HttpStatus.BAD_REQUEST;
      case ErrorCode.Conflict:
        return HttpStatus.CONFLICT;
      case ErrorCode.Gone:
        return HttpStatus.GONE;
      case ErrorCode.Undefined:
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}

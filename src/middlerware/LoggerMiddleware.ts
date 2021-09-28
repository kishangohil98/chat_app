import { inject, injectable } from 'inversify';
import { INVERSIFY_TYPES } from '../inversify/inversifyTypes';
import { ILogger } from '../common/logger/ILogger'
import * as express from 'express'
import * as morgan from 'morgan'
import { expressCb } from './expressCb'

@injectable()
export class LoggerMiddleware {
    constructor(
        @inject(INVERSIFY_TYPES.Logger) private logger: ILogger
    ) {}

    /**
     * Uses morgan to log the API request and response.
     * @returns {expressCb}
     */
    public handler(): expressCb {
        const loggerStream = {
            write: (message) => {
                this.logger.info(message);
              },
        };
        return morgan('combined', { stream: loggerStream });
    }


}
import { injectable } from 'inversify';
import { Logger, createLogger, transports, format } from 'winston'
import { ILogger } from './ILogger'

@injectable()
export class WinstonLogger implements ILogger {
    public readonly logger: Logger

    constructor() {
        this.logger = createLogger({
            transports: [
                new transports.Console({
                    level: 'debug',
                    handleExceptions: true,
                    format: format.combine(
                        format.timestamp(),
                        format.prettyPrint({ colorize: true })
                    ),
                }),
            ],
            exitOnError: false,
        });
    }

    public debug(message: string, metaData?: object) {
        this.logger.debug(message, metaData);
    }

    public info(message: string, metaData?: object) {
        this.logger.info(message, metaData);
    }

    public error(message: string, metaData?: object) {
        this.logger.error(message, metaData);
    }
}
export interface ILogger {
    debug(message: string, metaData?: object);
    info(message: string, metaData?: object);
    error(message: string, metaData?: object);
}
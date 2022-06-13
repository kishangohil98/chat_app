import { ErrorCode } from './ErrorCode';

export class Exception extends Error {
  public readonly errorCode?: ErrorCode;

  public readonly path?: string;

  public body?: any;

  constructor(errorCode: ErrorCode, message: string, path?: string) {
    super(message);
    this.errorCode = errorCode;
    this.path = path;
  }
}

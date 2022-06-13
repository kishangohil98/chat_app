import { Exception } from './Exception';
import { ErrorCode } from './ErrorCode';

export class ForbiddenException extends Exception {
  constructor(message = 'forbidden', path?: string) {
    super(ErrorCode.Forbidden, message, path);
  }
}

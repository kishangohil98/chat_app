import { Exception } from './Exception';
import { ErrorCode } from './ErrorCode';

export class ResourceNoLongerAvailableException extends Exception {
  constructor(message: string, path?: string) {
    super(ErrorCode.Gone, message, path);
  }
}

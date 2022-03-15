import { ErrorCode } from './ErrorCode'

export class Exception extends Error {
  public readonly errorCode?: ErrorCode
  public readonly path?: string
  public body?: any

  constructor(errorCode: ErrorCode, message: string, path?: string) {
    console.log('errorCode', errorCode)
    console.log('message', message)

    super(message)
    this.errorCode = errorCode
    this.path = path
  }
}

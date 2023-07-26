import { AppError } from './AppError'

/**
 * Base class for all HTTP exceptions.
 *
 * @example
 * import { HttpException } from '@core/node'
 * class MyException extends HttpException { ... }
 */
export abstract class HttpException extends AppError {
  abstract status: number
  abstract statusText?: string
  abstract isOperational: boolean

  constructor(message?: string) {
    super(message ?? 'Internal Server Error')
    Object.setPrototypeOf(this, HttpException.prototype)
  }

  abstract serialize(): {
    message: string
    field?: string
  }[]

  toJSON() {
    return {
      status: this.status,
      message: this.message,
    }
  }
}

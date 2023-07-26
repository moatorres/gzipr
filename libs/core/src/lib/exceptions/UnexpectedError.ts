import { HttpStatus } from '../common/HttpStatus'
import { HttpException } from './HttpException'

/**
 * Exception for *Unexpected* type errors.
 */
export class UnexpectedError extends HttpException {
  status = HttpStatus.INTERNAL_SERVER_ERROR
  statusText = 'Unexpected Error'
  isOperational = false

  constructor(message = 'Unexpected Error') {
    super(message)
    // set prototype explicitly to avoid `instanceof` errors
    Object.setPrototypeOf(this, UnexpectedError.prototype)
  }

  serialize() {
    return [{ message: 'Unexpected Error' }]
  }
}

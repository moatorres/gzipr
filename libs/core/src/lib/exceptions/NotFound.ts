import { HttpStatus } from '../common/HttpStatus'
import { HttpException } from './HttpException'

/**
 * Exception for *Not Found* type errors.
 */
export class NotFound extends HttpException {
  status = HttpStatus.NOT_FOUND
  statusText = 'Not Found'
  isOperational = true

  constructor(message = 'Not Found') {
    super(message)
    // set prototype explicitly to avoid `instanceof` errors
    Object.setPrototypeOf(this, NotFound.prototype)
  }

  serialize() {
    return [{ message: 'Not Found' }]
  }
}

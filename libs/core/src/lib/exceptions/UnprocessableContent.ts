import { HttpStatus } from '../common/HttpStatus'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *UnprocessableContent* type errors.
 *
 * @example
 * import { UnprocessableContent } from '@gzipr/core'
 * throw new UnprocessableContent() // HTTP 422 Unprocessable Content
 */
export class UnprocessableContent extends HttpException {
  status = HttpStatus.UNPROCESSABLE_CONTENT
  statusText = 'Unprocessable Content'
  isOperational = true

  constructor(message = 'Unprocessable Content') {
    super(message)
    // set prototype explicitly to avoid `instanceof` errors
    Object.setPrototypeOf(this, UnprocessableContent.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

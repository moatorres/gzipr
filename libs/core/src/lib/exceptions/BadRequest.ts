import { HttpStatus } from '../common/HttpStatus'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *BadRequest* type errors.
 *
 * @example
 * import { BadRequest } from '@gzipr/core'
 * throw new BadRequest() // HTTP 412 Bad Request
 */
export class BadRequest extends HttpException {
  status = HttpStatus.BAD_REQUEST
  statusText = 'Bad Request'
  isOperational = true

  constructor() {
    super('Bad Request')
    // set prototype explicitly to avoid `instanceof` errors
    Object.setPrototypeOf(this, BadRequest.prototype)
  }

  serialize() {
    return [{ message: 'Bad Request' }]
  }
}

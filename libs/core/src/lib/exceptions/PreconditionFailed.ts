import { HttpStatus } from '../common/HttpStatus'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *PreconditionFailed* type errors.
 *
 * @example
 * import { PreconditionFailed } from '@gzipr/core'
 * throw new PreconditionFailed() // HTTP 412 Precondition Failed
 */
export class PreconditionFailed extends HttpException {
  status = HttpStatus.PRECONDITION_FAILED
  statusText = 'Precondition Failed'
  isOperational = true

  constructor(message?: string) {
    super(message ?? 'Precondition Failed')
    // set prototype explicitly to avoid `instanceof` errors
    Object.setPrototypeOf(this, PreconditionFailed.prototype)
  }

  serialize() {
    return [{ message: 'Precondition Failed' }]
  }
}

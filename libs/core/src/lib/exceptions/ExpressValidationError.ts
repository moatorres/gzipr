import {
  Result,
  ValidationError,
  FieldValidationError,
} from 'express-validator'
import { HttpException } from './HttpException'
import { HttpStatus } from '../common'

/**
 * Represents a formatted express-validator error.
 */
interface FormattedValidationError {
  message: string
  field?: string
}

/**
 * Represents an error thrown when `express-validator` fails.
 */
export class ExpressValidationError extends HttpException {
  status = HttpStatus.BAD_REQUEST
  statusText = 'Bad Request'
  isOperational = true

  private readonly validationErrors: FormattedValidationError[] = []

  constructor(errors: Result<ValidationError>) {
    super('Express Validator Error')
    // set prototype explicitly to avoid `instanceof` errors
    Object.setPrototypeOf(this, ExpressValidationError.prototype)
    // format express-validator errors
    this.validationErrors = [
      ...this.validationErrors,
      ...errors.array().map((error) => ({
        message: error.msg,
        field: (error as FieldValidationError).path,
      })),
    ]
  }

  public serialize() {
    return Array.from(this.validationErrors)
  }
}

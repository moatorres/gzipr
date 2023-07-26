import { HttpException, HttpStatus } from '@gzipr/core'

export class FileValidationError extends HttpException {
  status = HttpStatus.BAD_GATEWAY
  statusText = 'FileValidationError'
  isOperational = true

  constructor(message = 'FileValidationError') {
    super(message)
    Object.setPrototypeOf(this, FileValidationError.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

export class FileNotFoundError extends HttpException {
  status = HttpStatus.NOT_FOUND
  statusText = 'FileNotFoundError'
  isOperational = true

  constructor(message = 'FileNotFoundError') {
    super(message)
    Object.setPrototypeOf(this, FileNotFoundError.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

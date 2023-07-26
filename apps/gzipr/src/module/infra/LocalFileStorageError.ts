import { HttpException, HttpStatus } from '@gzipr/core'

export class LocalFileStorageError extends HttpException {
  status = HttpStatus.INTERNAL_SERVER_ERROR
  statusText = 'LocalFileStorageError'
  isOperational = false

  constructor(message = 'LocalFileStorage Error') {
    super(message)
    Object.setPrototypeOf(this, LocalFileStorageError.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

export class FileNotFound extends HttpException {
  status = HttpStatus.NOT_FOUND
  statusText = 'FileNotFound'
  isOperational = true

  constructor(message = 'FileNotFound') {
    super(message)
    Object.setPrototypeOf(this, FileNotFound.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

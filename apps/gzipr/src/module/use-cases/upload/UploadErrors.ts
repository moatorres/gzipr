import { HttpException, HttpStatus } from '@gzipr/core'

/**
 * @typedef UploadErrors
 * @description Type that represents all possible upload errors
 */
export type UploadErrors =
  | InvalidHeaders
  | InvalidFileExtension
  | InvalidMimeType
  | InvalidGzipFile
  | InvalidContentType
  | InvalidContentLength
  | InvalidContentEncoding

/**
 * @class InvalidHeaders
 * @extends HttpException
 * @description Use this class when the request headers are invalid
 */
export class InvalidHeaders extends HttpException {
  status = HttpStatus.BAD_REQUEST
  statusText = 'InvalidHeaders'
  isOperational = true

  constructor(message = 'Invalid headers') {
    super(message)
    Object.setPrototypeOf(this, InvalidHeaders.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

/**
 * @class InvalidFileExtension
 * @extends HttpException
 * @description Use this class when the uploaded file has an invalid extension
 */
export class InvalidFileExtension extends HttpException {
  status = HttpStatus.BAD_REQUEST
  statusText = 'InvalidFileExtension'
  isOperational = true

  constructor(message = 'Invalid file extension') {
    super(message)
    Object.setPrototypeOf(this, InvalidFileExtension.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

/**
 * @class InvalidMimeType
 * @extends HttpException
 * @description Use this class when the uploaded file has an invalid mime type
 */
export class InvalidMimeType extends HttpException {
  status = HttpStatus.BAD_REQUEST
  statusText = 'InvalidMimeType'
  isOperational = true

  constructor(message = 'Invalid mime-type') {
    super(message)
    Object.setPrototypeOf(this, InvalidMimeType.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

/**
 * @class InvalidGzipFile
 * @extends HttpException
 * @description Use this class when the uploaded file is not a valid gzip file
 */
export class InvalidGzipFile extends HttpException {
  status = HttpStatus.BAD_REQUEST
  statusText = 'InvalidGzipFile'
  isOperational = true

  constructor(message = 'Invalid gzip file') {
    super(message)
    Object.setPrototypeOf(this, InvalidGzipFile.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

/**
 * @class InvalidContentType
 * @extends HttpException
 * @description Use this class when the uploaded file has an invalid content type
 */
export class InvalidContentType extends HttpException {
  status = HttpStatus.BAD_REQUEST
  statusText = 'InvalidContentType'
  isOperational = true

  constructor(message = 'Invalid content-type') {
    super(message)
    Object.setPrototypeOf(this, InvalidContentType.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

/**
 * @class InvalidContentLength
 * @extends HttpException
 * @description Use this class when the uploaded file has an invalid content length
 */
export class InvalidContentLength extends HttpException {
  status = HttpStatus.BAD_REQUEST
  statusText = 'InvalidContentLength'
  isOperational = true

  constructor(message = 'Invalid content-length') {
    super(message)
    Object.setPrototypeOf(this, InvalidContentLength.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

/**
 * @class InvalidContentEncoding
 * @extends HttpException
 * @description Use this class when the uploaded file has an invalid content encoding
 */
export class InvalidContentEncoding extends HttpException {
  status = HttpStatus.BAD_REQUEST
  statusText = 'InvalidContentEncoding'
  isOperational = true

  constructor(message = 'Invalid content-encoding') {
    super(message)
    Object.setPrototypeOf(this, InvalidContentEncoding.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

/**
 * @class EntityTooLargeError
 * @extends HttpException
 * @description Use this class when the uploaded file is too large
 */
export class EntityTooLargeError extends HttpException {
  status = HttpStatus.PRECONDITION_FAILED
  statusText = 'EntityTooLargeError'
  isOperational = true

  constructor(message = 'Entity too large') {
    super(message)
    Object.setPrototypeOf(this, EntityTooLargeError.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

export const UploadErrors = {
  InvalidHeaders,
  InvalidFileExtension,
  InvalidMimeType,
  InvalidGzipFile,
  InvalidContentType,
  InvalidContentLength,
  InvalidContentEncoding,
  EntityTooLargeError,
}

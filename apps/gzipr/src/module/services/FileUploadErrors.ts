import { HttpException, HttpStatus } from '@gzipr/core'

/**
 * @class FileUploadError
 * @extends HttpException
 * @description Use this class when the file upload fails
 */
export class FileUploadError extends HttpException {
  status = HttpStatus.INTERNAL_SERVER_ERROR
  statusText = 'FileUploadError'
  isOperational = false

  constructor(message = 'FileUploadError') {
    super(message)
    Object.setPrototypeOf(this, FileUploadError.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

/**
 * @typedef FileUploadErrors
 * @description Type that represents all possible upload errors
 */
export type FileUploadErrors =
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
  statusText = 'Invalid headers'
  isOperational = true

  constructor(message = 'Invalid Headers') {
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
  statusText = 'Invalid file extension'
  isOperational = true

  constructor(message = 'Invalid File Extension') {
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
  statusText = 'Invalid mime-type'
  isOperational = true

  constructor(message = 'Invalid Mime Type') {
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
  status = HttpStatus.PRECONDITION_FAILED
  statusText = 'Invalid gzip file'
  isOperational = true

  constructor(message = 'Invalid Gzip File') {
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
  statusText = 'Invalid content-type'
  isOperational = true

  constructor(message = 'Invalid Content Type') {
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
  statusText = 'Invalid content-length'
  isOperational = true

  constructor(message = 'Invalid Content Length') {
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
  statusText = 'Invalid content-encoding'
  isOperational = true

  constructor(message = 'Invalid Content Encoding') {
    super(message)
    Object.setPrototypeOf(this, InvalidContentEncoding.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

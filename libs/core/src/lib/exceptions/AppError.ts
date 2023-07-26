/**
 * Base error for all errors in the application.
 * This error is not meant to be used directly.
 * Instead, use one of the subclasses.
 *
 * @see https://stackoverflow.com/a/48342359/6178885
 */
export class AppError extends Error {
  readonly isOperational: boolean = true

  constructor(message: string) {
    super(message)

    // set the prototype explicitly
    Object.setPrototypeOf(this, new.target.prototype)

    // extending Error does not propagate the `message` properly so we have to set it manually
    Object.defineProperty(this, 'message', {
      enumerable: false,
      value: message,
    })

    // restore the correct prototype chain
    Object.defineProperty(this, 'name', {
      enumerable: false,
      value: this.constructor.name,
    })

    // set the stack trace
    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, this.constructor)
    } else {
      Object.defineProperty(this, 'stack', {
        enumerable: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: (Error as any)(message).stack,
        writable: true,
        configurable: true,
      })
    }
  }
}

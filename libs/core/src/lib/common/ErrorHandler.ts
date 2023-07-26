import { ErrorHandler } from './Types'
import { ConsoleLogger, Logger } from '../logger'
import { AppError, HttpException } from '../exceptions'

/**
 * ErrorHandler implementation that can handle different types of errors.
 * It logs the error and can determine if the error is trusted or not.
 */
export class ErrorHandlerImpl implements ErrorHandler {
  /**
   * Constructs an instance of the ErrorHandlerImpl class.
   * @param logger Optional logger instance to use for logging errors. If not provided, a ConsoleLogger instance will be used.
   */
  constructor(private logger?: Logger) {
    this.logger = logger || new ConsoleLogger()
  }

  /**
   * Handles an error by logging it and performing any necessary actions.
   * @param err The error to handle.
   */
  public async handle(err: Error): Promise<void>
  public async handle(err: AppError): Promise<void>
  public async handle(err: HttpException): Promise<void>
  public async handle(err: Error | AppError | HttpException): Promise<void> {
    // we can do something with the error here
    // for example, we can send it to a monitoring service
    // or we can log it to the console, etc
    this.logger.error('ErrorHandler', err)
    this.logger.debug(err)
  }

  /**
   * Determines if an error is trusted or not.
   * @param error The error to check.
   * @returns True if the error is trusted, false otherwise.
   */
  public isTrustedError(error: Error | AppError | HttpException | unknown) {
    if (error instanceof AppError) {
      return error.isOperational
    }
    return false
  }
}

/**
 * Singleton instance of the ErrorHandlerImpl class.
 */
export const errorHandler = new ErrorHandlerImpl()

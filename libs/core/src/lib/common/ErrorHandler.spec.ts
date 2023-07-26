import { ErrorHandlerImpl } from './ErrorHandler'
import { AppError, UnexpectedError } from '../exceptions'
import { ConsoleLogger } from '../logger'

describe('ErrorHandlerImpl', () => {
  let errorHandler: ErrorHandlerImpl
  let loggerSpy: jest.SpyInstance

  beforeEach(() => {
    loggerSpy = jest.spyOn(ConsoleLogger.prototype, 'error')
    errorHandler = new ErrorHandlerImpl()
  })

  afterEach(() => {
    loggerSpy.mockClear()
  })

  describe('handle', () => {
    it('should log the error', async () => {
      const error = new Error('Test error')
      await errorHandler.handle(error)
      expect(loggerSpy).toHaveBeenCalledWith('ErrorHandler', error)
    })

    it('should log the error and debug info', async () => {
      const error = new Error('Test error')
      await errorHandler.handle(error)
      expect(loggerSpy).toHaveBeenCalledWith('ErrorHandler', error)
    })
  })

  describe('isTrustedError', () => {
    it('should return true for AppError with isOperational true', () => {
      const error = new AppError('Test error')
      expect(errorHandler.isTrustedError(error)).toBe(true)
    })

    it('should return false for AppError with isOperational false', () => {
      const error = new UnexpectedError('Test error')
      expect(errorHandler.isTrustedError(error)).toBe(false)
    })

    it('should return false for unknown error type', () => {
      const error = { message: 'Test error' }
      expect(errorHandler.isTrustedError(error)).toBe(false)
    })
  })
})

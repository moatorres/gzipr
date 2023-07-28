import { AppError } from './AppError'

describe('AppError', () => {
  it('should create a new instance of AppError', () => {
    const appError = new AppError('Test Error')
    expect(appError).toBeInstanceOf(AppError)
    expect(appError).toBeInstanceOf(Error)
  })

  it('should set the isOperational property to true', () => {
    const appError = new AppError('Test Error')
    expect(appError.isOperational).toBe(true)
  })

  it('should set the message property correctly', () => {
    const appError = new AppError('Test Error')
    expect(appError.message).toBe('Test Error')
  })

  it('should set the name property correctly', () => {
    const appError = new AppError('Test Error')
    expect(appError.name).toBe('AppError')
  })

  it('should capture the stack trace', () => {
    const appError = new AppError('Test Error')
    expect(typeof appError.stack).toBe('string')
    expect(appError.stack).toContain('Test Error')
  })

  it('should not enumerate the message property', () => {
    const appError = new AppError('Test Error')
    const enumerableProperties = Object.keys(appError)
    expect(enumerableProperties).not.toContain('message')
  })

  it('should not enumerate the name property', () => {
    const appError = new AppError('Test Error')
    const enumerableProperties = Object.keys(appError)
    expect(enumerableProperties).not.toContain('name')
  })

  it('should not enumerate the stack property', () => {
    const appError = new AppError('Test Error')
    const enumerableProperties = Object.keys(appError)
    expect(enumerableProperties).not.toContain('stack')
  })
})

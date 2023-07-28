jest.mock('express-validator')

import { Result, ValidationError } from 'express-validator'
import { ExpressValidationError } from './ExpressValidationError'
import { HttpStatus } from '../common'
import { HttpException } from './HttpException'

describe('ExpressValidationError', () => {
  const mockError: ValidationError = {
    value: '',
    msg: 'Test Error',
    location: 'body',
    type: 'field',
    path: 'test',
  }

  let mockResult: jest.Mocked<Result<ValidationError>>

  beforeEach(() => {
    mockResult = {
      array: jest.fn().mockReturnValue([mockError]),
      isEmpty: jest.fn().mockReturnValue(false),
    } as unknown as jest.Mocked<Result<ValidationError>>
  })

  it('should create a new instance of ExpressValidationError', () => {
    const expressValidationError = new ExpressValidationError(mockResult)
    expect(expressValidationError).toBeInstanceOf(ExpressValidationError)
    expect(expressValidationError).toBeInstanceOf(HttpException)
    expect(expressValidationError).toBeInstanceOf(Error)
  })

  it('should set the status property correctly', () => {
    const expressValidationError = new ExpressValidationError(mockResult)
    expect(expressValidationError.status).toBe(HttpStatus.BAD_REQUEST)
  })

  it('should set the statusText property correctly', () => {
    const expressValidationError = new ExpressValidationError(mockResult)
    expect(expressValidationError.statusText).toBe('Bad Request')
  })

  it('should set the isOperational property to true', () => {
    const expressValidationError = new ExpressValidationError(mockResult)
    expect(expressValidationError.isOperational).toBe(true)
  })

  it('should set the message property correctly', () => {
    const expressValidationError = new ExpressValidationError(mockResult)
    expect(expressValidationError.message).toBe('Express Validator Error')
  })

  it('should serialize the error correctly', () => {
    const expressValidationError = new ExpressValidationError(mockResult)
    const serialized = expressValidationError.serialize()
    expect(serialized).toEqual([{ message: 'Test Error', field: 'test' }])
  })
})

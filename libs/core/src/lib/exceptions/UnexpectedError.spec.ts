import { UnexpectedError } from './UnexpectedError'
import { HttpStatus } from '../common/HttpStatus'
import { HttpException } from './HttpException'

describe('UnexpectedError', () => {
  it('should create a new instance of UnexpectedError', () => {
    const badRequest = new UnexpectedError()
    expect(badRequest).toBeInstanceOf(UnexpectedError)
    expect(badRequest).toBeInstanceOf(HttpException)
    expect(badRequest).toBeInstanceOf(Error)
  })

  it('should set the status property correctly', () => {
    const badRequest = new UnexpectedError()
    expect(badRequest.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
  })

  it('should set the statusText property correctly', () => {
    const badRequest = new UnexpectedError()
    expect(badRequest.statusText).toBe('Unexpected Error')
  })

  it('should set the isOperational property to false', () => {
    const badRequest = new UnexpectedError()
    expect(badRequest.isOperational).toBe(false)
  })

  it('should set the message property correctly', () => {
    const badRequest = new UnexpectedError()
    expect(badRequest.message).toBe('Unexpected Error')
  })

  it('should serialize the error correctly', () => {
    const badRequest = new UnexpectedError()
    const serialized = badRequest.serialize()
    expect(serialized).toEqual([{ message: 'Unexpected Error' }])
  })
})

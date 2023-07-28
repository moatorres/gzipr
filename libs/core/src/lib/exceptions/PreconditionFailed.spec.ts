import { PreconditionFailed } from './PreconditionFailed'
import { HttpStatus } from '../common/HttpStatus'
import { HttpException } from './HttpException'

describe('PreconditionFailed', () => {
  it('should create a new instance of PreconditionFailed', () => {
    const badRequest = new PreconditionFailed()
    expect(badRequest).toBeInstanceOf(PreconditionFailed)
    expect(badRequest).toBeInstanceOf(HttpException)
    expect(badRequest).toBeInstanceOf(Error)
  })

  it('should set the status property correctly', () => {
    const badRequest = new PreconditionFailed()
    expect(badRequest.status).toBe(HttpStatus.PRECONDITION_FAILED)
  })

  it('should set the statusText property correctly', () => {
    const badRequest = new PreconditionFailed()
    expect(badRequest.statusText).toBe('Precondition Failed')
  })

  it('should set the isOperational property to true', () => {
    const badRequest = new PreconditionFailed()
    expect(badRequest.isOperational).toBe(true)
  })

  it('should set the message property correctly', () => {
    const badRequest = new PreconditionFailed()
    expect(badRequest.message).toBe('Precondition Failed')
  })

  it('should serialize the error correctly', () => {
    const badRequest = new PreconditionFailed()
    const serialized = badRequest.serialize()
    expect(serialized).toEqual([{ message: 'Precondition Failed' }])
  })
})

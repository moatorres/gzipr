import { NotFound } from './NotFound'
import { HttpStatus } from '../common/HttpStatus'
import { HttpException } from './HttpException'

describe('NotFound', () => {
  it('should create a new instance of NotFound', () => {
    const badRequest = new NotFound()
    expect(badRequest).toBeInstanceOf(NotFound)
    expect(badRequest).toBeInstanceOf(HttpException)
    expect(badRequest).toBeInstanceOf(Error)
  })

  it('should set the status property correctly', () => {
    const badRequest = new NotFound()
    expect(badRequest.status).toBe(HttpStatus.NOT_FOUND)
  })

  it('should set the statusText property correctly', () => {
    const badRequest = new NotFound()
    expect(badRequest.statusText).toBe('Not Found')
  })

  it('should set the isOperational property to true', () => {
    const badRequest = new NotFound()
    expect(badRequest.isOperational).toBe(true)
  })

  it('should set the message property correctly', () => {
    const badRequest = new NotFound()
    expect(badRequest.message).toBe('Not Found')
  })

  it('should serialize the error correctly', () => {
    const badRequest = new NotFound()
    const serialized = badRequest.serialize()
    expect(serialized).toEqual([{ message: 'Not Found' }])
  })
})

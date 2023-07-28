import { UnprocessableContent } from './UnprocessableContent'
import { HttpStatus } from '../common/HttpStatus'
import { HttpException } from './HttpException'

describe('UnprocessableContent', () => {
  it('should create a new instance of UnprocessableContent', () => {
    const badRequest = new UnprocessableContent()
    expect(badRequest).toBeInstanceOf(UnprocessableContent)
    expect(badRequest).toBeInstanceOf(HttpException)
    expect(badRequest).toBeInstanceOf(Error)
  })

  it('should set the status property correctly', () => {
    const badRequest = new UnprocessableContent()
    expect(badRequest.status).toBe(HttpStatus.UNPROCESSABLE_CONTENT)
  })

  it('should set the statusText property correctly', () => {
    const badRequest = new UnprocessableContent()
    expect(badRequest.statusText).toBe('Unprocessable Content')
  })

  it('should set the isOperational property to true', () => {
    const badRequest = new UnprocessableContent()
    expect(badRequest.isOperational).toBe(true)
  })

  it('should set the message property correctly', () => {
    const badRequest = new UnprocessableContent()
    expect(badRequest.message).toBe('Unprocessable Content')
  })

  it('should serialize the error correctly', () => {
    const badRequest = new UnprocessableContent()
    const serialized = badRequest.serialize()
    expect(serialized).toEqual([{ message: 'Unprocessable Content' }])
  })
})

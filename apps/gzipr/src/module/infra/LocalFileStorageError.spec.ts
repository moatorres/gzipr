import { HttpStatus, HttpException } from '@gzipr/core'
import { LocalFileStorageError } from './LocalFileStorageError'

describe('LocalFileStorageError', () => {
  it('should create a new instance of LocalFileStorageError', () => {
    const badRequest = new LocalFileStorageError()
    expect(badRequest).toBeInstanceOf(LocalFileStorageError)
    expect(badRequest).toBeInstanceOf(HttpException)
    expect(badRequest).toBeInstanceOf(Error)
  })

  it('should set the status property correctly', () => {
    const badRequest = new LocalFileStorageError()
    expect(badRequest.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
  })

  it('should set the statusText property correctly', () => {
    const badRequest = new LocalFileStorageError()
    expect(badRequest.statusText).toBe('LocalFileStorageError')
  })

  it('should set the isOperational property to false', () => {
    const badRequest = new LocalFileStorageError()
    expect(badRequest.isOperational).toBe(false)
  })

  it('should set the message property correctly', () => {
    const badRequest = new LocalFileStorageError()
    expect(badRequest.message).toBe('LocalFileStorage Error')
  })

  it('should serialize the error correctly', () => {
    const badRequest = new LocalFileStorageError()
    const serialized = badRequest.serialize()
    expect(serialized).toEqual([{ message: 'LocalFileStorage Error' }])
  })
})

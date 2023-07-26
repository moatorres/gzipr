import { Request, Response } from 'express'
import { catchAsync, tryCatch } from './catch-async'

describe('catchAsync', () => {
  it('should call the function and pass any errors to the next function', async () => {
    const fn = jest.fn().mockRejectedValueOnce(new Error('Test error'))
    const req = {} as Request
    const res = {} as Response
    const next = jest.fn()
    await catchAsync(fn)(req, res, next)
    expect(fn).toHaveBeenCalledWith(req, res, next)
    expect(next).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should call the function and not pass any errors to the next function', async () => {
    const fn = jest.fn().mockResolvedValueOnce('Test result')
    const req = {} as Request
    const res = {} as Response
    const next = jest.fn()
    await catchAsync(fn)(req, res, next)
    expect(fn).toHaveBeenCalledWith(req, res, next)
    expect(next).not.toHaveBeenCalled()
  })
})

describe('tryCatch', () => {
  it('should call the function and catch any errors that occur', async () => {
    const fn = jest.fn().mockRejectedValueOnce(new Error('Test error'))
    const req = {} as Request
    const res = {} as Response
    const next = jest.fn()
    await tryCatch(fn)(req, res, next)
    expect(fn).toHaveBeenCalledWith(req, res, next)
    expect(next).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should call the function and not catch any errors that occur', async () => {
    const fn = jest.fn().mockResolvedValueOnce('Test result')
    const req = {} as Request
    const res = {} as Response
    const next = jest.fn()
    await tryCatch(fn)(req, res, next)
    expect(fn).toHaveBeenCalledWith(req, res, next)
    expect(next).not.toHaveBeenCalled()
  })
})

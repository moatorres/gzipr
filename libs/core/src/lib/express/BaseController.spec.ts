/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express'
import { Logger } from '../logger'
import { HttpStatus } from '../common/HttpStatus'
import { BaseController } from './BaseController'

const loggerMock: Logger = {
  debug: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

class MockController extends BaseController {
  constructor() {
    super()
  }
  validate() {
    return Promise.resolve()
  }

  handler(): Promise<void> {
    return Promise.resolve()
  }
}

describe('BaseController', () => {
  let res: any
  let controller: BaseController

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    }
    controller = new MockController()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should send OK status without body', async () => {
    controller.ok(res)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith({ status: HttpStatus.OK })
  })

  it('should send OK status with body', async () => {
    const body = { message: 'test' }
    controller.ok(res, body)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith({ status: HttpStatus.OK, body })
  })

  it('should send CREATED status without body', async () => {
    controller.created(res)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
    expect(res.json).toHaveBeenCalledWith({ status: HttpStatus.CREATED })
  })

  it('should send CREATED status with body', async () => {
    const body = { message: 'test' }
    controller.created(res, body)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
    expect(res.json).toHaveBeenCalledWith({ status: HttpStatus.CREATED, body })
  })

  it('should send CLIENT_ERROR status without message', async () => {
    controller.badRequest(res)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({
      status: HttpStatus.BAD_REQUEST,
      message: 'Bad request',
      errors: [],
    })
  })

  it('should send CLIENT_ERROR status with message', async () => {
    const message = 'test'
    controller.badRequest(res, message)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({
      status: HttpStatus.BAD_REQUEST,
      message,
      errors: [],
    })
  })

  it('should send NOT_FOUND status without message', async () => {
    controller.notFound(res)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({
      status: HttpStatus.NOT_FOUND,
      message: 'Not found',
    })
  })

  it('should send NOT_FOUND status with message', async () => {
    const message = 'test'
    controller.notFound(res, message)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({
      status: HttpStatus.NOT_FOUND,
      message,
    })
  })

  it('should send UNPROCESSABLE status without message', async () => {
    controller.unprocessable(res)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.UNPROCESSABLE_CONTENT)
    expect(res.json).toHaveBeenCalledWith({
      status: HttpStatus.UNPROCESSABLE_CONTENT,
      message: 'Unprocessable content',
    })
  })

  it('should send UNPROCESSABLE status with message', async () => {
    const message = 'test'
    controller.unprocessable(res, message)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.UNPROCESSABLE_CONTENT)
    expect(res.json).toHaveBeenCalledWith({
      status: HttpStatus.UNPROCESSABLE_CONTENT,
      message,
    })
  })

  it('should send TOO_MANY status without message', async () => {
    controller.tooMany(res)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.TOO_MANY_REQUESTS)
    expect(res.json).toHaveBeenCalledWith({
      status: HttpStatus.TOO_MANY_REQUESTS,
      message: 'Too many requests',
    })
  })

  it('should send TOO_MANY status with message', async () => {
    const message = 'test'
    controller.tooMany(res, message)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.TOO_MANY_REQUESTS)
    expect(res.json).toHaveBeenCalledWith({
      status: HttpStatus.TOO_MANY_REQUESTS,
      message,
    })
  })

  it('should send status without body', async () => {
    controller.send(res)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith({ status: HttpStatus.OK })
  })

  it('should send status with body', async () => {
    const body = { message: 'test' }
    controller.send(res, body)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.send).toHaveBeenCalledWith({ status: HttpStatus.OK, body })
  })

  it('should send json without body', async () => {
    controller.json(res)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith({ status: HttpStatus.OK })
  })

  it('should send json with body', async () => {
    const body = { message: 'test' }
    controller.json(res, body)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith({ status: HttpStatus.OK, body })
  })

  it('should catch error and log it', async () => {
    const req: Request = {} as Request
    const err = new Error()
    ;(controller.handler as jest.Mock) = jest.fn().mockRejectedValue(err)

    await controller.execute(req, res)
    expect(loggerMock.debug).toHaveBeenCalledWith(err)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error occurred',
    })
  })
})

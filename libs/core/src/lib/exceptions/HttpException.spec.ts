import { AppError } from './AppError'
import { HttpException } from './HttpException'

class TestHttpException extends HttpException {
  status = 500
  statusText = 'Test Exception'
  isOperational = true

  constructor(message?: string) {
    super(message)
    // set prototype explicitly to avoid `instanceof` errors
    Object.setPrototypeOf(this, TestHttpException.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}

describe('HttpException', () => {
  it('should create a new instance of HttpException', () => {
    const httpException = new TestHttpException('Test Exception')
    expect(httpException).toBeInstanceOf(TestHttpException)
    expect(httpException).toBeInstanceOf(AppError)
    expect(httpException).toBeInstanceOf(Error)
  })

  it('should set the status property correctly', () => {
    const httpException = new TestHttpException('Test Exception')
    expect(httpException.status).toBe(500)
  })

  it('should set the statusText property correctly', () => {
    const httpException = new TestHttpException('Test Exception')
    expect(httpException.statusText).toBe('Test Exception')
  })

  it('should set the isOperational property to true', () => {
    const httpException = new TestHttpException('Test Exception')
    expect(httpException.isOperational).toBe(true)
  })

  it('should set the message property correctly', () => {
    const httpException = new TestHttpException('Test Exception')
    expect(httpException.message).toBe('Test Exception')
  })

  it('should serialize the error correctly', () => {
    const httpException = new TestHttpException('Test Exception')
    const serialized = httpException.serialize()
    expect(serialized).toEqual([{ message: 'Test Exception' }])
  })

  it('should transform to JSON correctly', () => {
    const httpException = new TestHttpException('Test Exception')
    const json = httpException.toJSON()
    expect(json).toEqual({
      status: 500,
      message: 'Test Exception',
    })
  })
})

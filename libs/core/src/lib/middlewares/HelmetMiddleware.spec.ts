import helmet from 'helmet'
import { HelmetMiddleware } from './HelmetMiddleware'

jest.mock('helmet', () => jest.fn(() => jest.fn()))

describe('HelmetMiddleware', () => {
  let helmetMiddleware: HelmetMiddleware

  beforeEach(() => {
    helmetMiddleware = new HelmetMiddleware()
  })

  it('should create helmet middleware with default options when no options provided', () => {
    const middleware = helmetMiddleware.getMiddleware()

    expect(helmet).toHaveBeenCalledWith({
      noSniff: true,
    })

    expect(typeof middleware).toBe('function')
  })

  it('should create helmet middleware with provided options', () => {
    helmetMiddleware = new HelmetMiddleware({ dnsPrefetchControl: false })

    helmetMiddleware.getMiddleware()

    expect(helmet).toHaveBeenCalledWith({
      noSniff: true,
      dnsPrefetchControl: false,
    })
  })

  it('should return correct default options', () => {
    const defaultOptions = helmetMiddleware.getDefaultOptions()()

    expect(defaultOptions).toEqual({
      noSniff: true,
    })
  })
})

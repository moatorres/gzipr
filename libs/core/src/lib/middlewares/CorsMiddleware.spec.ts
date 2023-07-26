import cors from 'cors'
import { CorsMiddleware } from './CorsMiddleware'

jest.mock('cors', () => jest.fn(() => jest.fn()))

describe('CorsMiddleware', () => {
  let corsMiddleware: CorsMiddleware

  beforeEach(() => {
    corsMiddleware = new CorsMiddleware()
  })

  it('should create cors middleware with default options when no options provided', () => {
    const middleware = corsMiddleware.getMiddleware()

    expect(cors).toHaveBeenCalledWith({
      origin: process.env.NODE_ENV === 'development' ? '*' : true,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: false,
      preflightContinue: false,
      maxAge: 86400,
    })

    expect(typeof middleware).toBe('function')
  })

  it('should create cors middleware with provided options', () => {
    corsMiddleware = new CorsMiddleware({ credentials: true, maxAge: 10000 })

    corsMiddleware.getMiddleware()

    expect(cors).toHaveBeenCalledWith({
      origin: process.env.NODE_ENV === 'development' ? '*' : true,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      preflightContinue: false,
      maxAge: 10000,
    })
  })

  it('should return correct default options', () => {
    const defaultOptions = corsMiddleware.getDefaultOptions()()

    expect(defaultOptions).toEqual({
      origin: process.env.NODE_ENV === 'development' ? '*' : true,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: false,
      preflightContinue: false,
      maxAge: 86400,
    })
  })
})

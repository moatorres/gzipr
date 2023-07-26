import hpp from 'hpp'
import { HPPMiddleware } from './HPPMiddleware'

jest.mock('hpp', () => jest.fn(() => jest.fn()))

describe('HPPMiddleware', () => {
  let hppMiddleware: HPPMiddleware

  beforeEach(() => {
    hppMiddleware = new HPPMiddleware()
  })

  it('should create hpp middleware with default options when no options provided', () => {
    const middleware = hppMiddleware.getMiddleware()

    expect(hpp).toHaveBeenCalledWith({})

    expect(typeof middleware).toBe('function')
  })

  it('should create hpp middleware with provided options', () => {
    const customOptions = { whitelist: ['param1', 'param2'] }
    hppMiddleware = new HPPMiddleware(customOptions)

    hppMiddleware.getMiddleware()

    expect(hpp).toHaveBeenCalledWith(customOptions)
  })

  it('should return correct default options', () => {
    const defaultOptions = hppMiddleware.getDefaultOptions()()

    expect(defaultOptions).toEqual({})
  })
})

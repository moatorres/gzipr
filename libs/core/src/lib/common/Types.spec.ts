import { Context, Middleware, RequestHandler } from './Types'

describe('Context', () => {
  type TestType = {
    a: number
    b: string
  }

  const props: TestType = { a: 1, b: 'test' }

  let context: Context<TestType>

  beforeEach(() => {
    context = new Context(props)
  })

  it('should resolve values correctly', () => {
    expect(context.resolve('a')).toBe(1)
    expect(context.resolve('b')).toBe('test')
  })

  it('should extend context correctly', () => {
    const extendedProps = { c: true }
    const extendedContext = context.extend(extendedProps)
    expect(extendedContext.resolve('a')).toBe(1)
    expect(extendedContext.resolve('b')).toBe('test')
    expect(extendedContext.resolve('c')).toBe(true)
  })
})

class TestMiddleware extends Middleware<object> {
  constructor(options?: object) {
    super(options)
  }

  getDefaultOptions() {
    return () => ({ option: false })
  }

  getMiddleware(): RequestHandler {
    return async () => ({
      ...this.getDefaultOptions()(),
      ...this.options,
    })
  }
}

describe('TestMiddleware', () => {
  it('should return default options', () => {
    const middleware = new TestMiddleware()
    expect(middleware.getDefaultOptions()()).toEqual({ option: false })
  })

  it('should return options from constructor', async () => {
    const middleware = new TestMiddleware({ option: true })
    expect(await middleware.getMiddleware()()).toEqual({ option: true })
  })
})

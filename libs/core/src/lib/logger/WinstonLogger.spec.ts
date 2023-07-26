import { WinstonLogger } from './WinstonLogger'

describe('WinstonLogger', () => {
  let winstonLogger: WinstonLogger
  let spy: jest.SpyInstance

  beforeEach(() => {
    winstonLogger = new WinstonLogger()
    spy = jest.spyOn(winstonLogger, 'log')
  })

  afterEach(() => {
    spy.mockRestore()
  })

  it('should call winston logger correctly when calling debug', () => {
    const message = 'test debug'
    const optional = { key: 'value' }

    spy = jest.spyOn(winstonLogger, 'debug')
    winstonLogger.debug(message, optional)

    expect(spy).toHaveBeenCalledWith(message, optional)
  })

  it('should call winston logger correctly when calling log', () => {
    const message = 'test log'
    const optional = { key: 'value' }

    spy = jest.spyOn(winstonLogger, 'log')
    winstonLogger.log(message, optional)

    expect(spy).toHaveBeenCalledWith(message, optional)
  })

  it('should call winston logger correctly when calling warn', () => {
    const message = 'test warn'
    const optional = { key: 'value' }

    spy = jest.spyOn(winstonLogger, 'warn')
    winstonLogger.warn(message, optional)

    expect(spy).toHaveBeenCalledWith(message, optional)
  })

  it('should call winston logger correctly when calling error', () => {
    const message = 'test error'
    const optional = { key: 'value' }

    spy = jest.spyOn(winstonLogger, 'error')
    winstonLogger.error(message, optional)

    expect(spy).toHaveBeenCalledWith(message, optional)
  })
})

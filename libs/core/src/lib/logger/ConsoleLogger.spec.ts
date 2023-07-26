import { ConsoleLogger } from './ConsoleLogger'

describe('@gzipr/core - ConsoleLogger', () => {
  let consoleLogger: ConsoleLogger

  beforeEach(() => {
    consoleLogger = new ConsoleLogger()
  })

  it('should log a message with the "log" level', () => {
    const spy = jest.spyOn(process.stdout, 'write')
    consoleLogger.log('Test message')
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test message'))
  })

  it('should log an error message with the "error" level', () => {
    const spy = jest.spyOn(process.stderr, 'write')
    consoleLogger.error('Test error')
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test error'))
  })

  it('should log a warning message with the "warn" level', () => {
    const spy = jest.spyOn(process.stdout, 'write')
    consoleLogger.warn('Test warning')
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test warning'))
  })

  it('should log a debug message with the "debug" level', () => {
    const spy = jest.spyOn(process.stdout, 'write')
    consoleLogger.debug('Test debug')
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test debug'))
  })

  it('should log a verbose message with the "verbose" level', () => {
    const spy = jest.spyOn(process.stdout, 'write')
    consoleLogger.verbose('Test verbose')
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test verbose'))
  })

  it('should set log levels', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const logLevels = ['log', 'debug', 'warn'] as any
    consoleLogger.setLogLevels(logLevels)
    expect(consoleLogger['options'].logLevels).toEqual(logLevels)
  })
})

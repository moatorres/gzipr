/* eslint-disable @typescript-eslint/no-explicit-any */
import * as w from 'winston'
import { Logger } from './Logger'

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
}

const formatter = w.format.combine(
  w.format.colorize(),
  w.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  w.format.splat(),
  w.format.printf((info) => {
    const { timestamp, level, message, ...optional } = info

    return `${timestamp} [${level}]: ${message} ${
      Object.keys(optional).length ? JSON.stringify(optional, null, 2) : ''
    }`
  })
)

export class WinstonLogger implements Logger {
  private logger: w.Logger

  constructor() {
    const prodTransport = new w.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    })
    const transport = new w.transports.Console({
      format: formatter,
    })
    this.logger = w.createLogger({
      level: process.env.NODE_ENV === 'development' ? 'trace' : 'error',
      levels: customLevels.levels,
      transports: [
        process.env.NODE_ENV === 'development' ? transport : prodTransport,
      ],
    })
    w.addColors(customLevels.colors)
  }

  log(message: string, optional?: any) {
    this.logger.info(message, optional)
  }

  debug(message: string, optional?: any) {
    this.logger.debug(message, optional)
  }

  warn(message: string, optional?: any) {
    this.logger.warn(message, optional)
  }

  error(message: string, optional?: any) {
    this.logger.error(message, optional)
  }
}

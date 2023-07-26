import { Request, Response } from 'express'
import morgan, { Options as MorganOptions, FormatFn } from 'morgan'

import { Logger } from '../logger/Logger'
import { Middleware } from '../common'
import { ConsoleLogger } from '../logger'

export interface MorganMiddlewareOptions {
  format?: string | FormatFn
  options?: MorganOptions<Request, Response>
  logger?: Logger
}

export class MorganMiddleware extends Middleware<MorganMiddlewareOptions> {
  constructor(options?: MorganMiddlewareOptions) {
    super(options ?? {})
  }

  public getDefaultOptions(): () => MorganMiddlewareOptions {
    return () =>
      ({
        format: 'dev',
        options: {},
        logger: new ConsoleLogger(),
      } as MorganMiddlewareOptions)
  }

  public getMiddleware() {
    const defaultOptions = this.getDefaultOptions()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { format, options, logger } = defaultOptions()

    const morganFormat = format ?? 'dev'
    const morganOptions = options ?? {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return morgan(morganFormat as any, {
      ...morganOptions,
      stream: {
        write: (message: string) => logger.log(message.trim()),
      },
    })
  }
}

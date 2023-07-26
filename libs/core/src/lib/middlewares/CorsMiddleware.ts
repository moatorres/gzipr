import cors from 'cors'
import { CorsOptions } from 'cors'
import { RequestHandler } from 'express'

import { Middleware } from '../common'

export class CorsMiddleware extends Middleware<CorsOptions> {
  constructor(options?: CorsOptions) {
    super(options ?? {})
  }

  public getDefaultOptions(): () => CorsOptions {
    return () => ({
      origin: process.env.NODE_ENV === 'development' ? '*' : true,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: false,
      preflightContinue: false,
      maxAge: 86400,
    })
  }

  public getMiddleware(): RequestHandler {
    const defaultOptions = this.getDefaultOptions()
    return cors({ ...defaultOptions(), ...this.options })
  }
}

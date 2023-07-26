import { RequestHandler } from 'express'

import { HttpStatus, Middleware } from '../common'

interface RoutesMiddlewareOptions {
  status?: HttpStatus
  message?: string
  showRequestInfo?: boolean
}

export class RoutesMiddleware extends Middleware<RoutesMiddlewareOptions> {
  constructor(options?: RoutesMiddlewareOptions) {
    super(options ?? {})
  }

  public getDefaultOptions(): () => RoutesMiddlewareOptions {
    return () => ({
      status: HttpStatus.NOT_FOUND,
      message: `The endpoint you're looking for doesn't exist or couldn't be found.`,
    })
  }

  public getMiddleware(): RequestHandler {
    const defaultOptions = this.getDefaultOptions()
    return (req, res) => {
      if (!res.headersSent) {
        res.status(HttpStatus.NOT_FOUND).json({
          ...defaultOptions(),
          ...this.options,
          showRequestInfo: undefined,
          ...(this.options.showRequestInfo && {
            request: {
              method: req.method,
              protocol: req.protocol,
              hostname: req.hostname,
              path: req.path,
              ip: req.ip,
              userAgent: req.get('user-agent'),
              uri: `${req.protocol}://${req.hostname}${req.originalUrl}`,
            },
          }),
        })
      }
    }
  }
}

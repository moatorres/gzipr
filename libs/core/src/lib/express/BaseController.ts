import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import { Logger } from '../logger'
import { HttpStatus } from '../common'
import { ExpressValidationError } from '../exceptions'

export abstract class BaseController {
  constructor(protected readonly logger: Logger) {
    this.logger = logger
  }

  protected abstract handler(
    req: Request,
    res: Response,
    next?: NextFunction
  ): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<void | any>

  protected abstract validate(req: Request): Promise<void>

  public async execute(req: Request, res: Response) {
    try {
      await this.validate(req)
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return this.validationError(res, new ExpressValidationError(errors))
      } else {
        await this.handler(req, res)
      }
    } catch (err) {
      this.logger.debug('BaseController', err)
      this.fail(res, 'An unexpected error occurred')
    }
  }

  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ status: code, message })
  }

  public send<T = unknown>(res: Response, body?: T) {
    if (!body) return res.status(HttpStatus.OK).json({ status: HttpStatus.OK })
    return res.status(HttpStatus.OK).send({ status: HttpStatus.OK, body })
  }

  public json<T = unknown>(res: Response, body?: T) {
    if (!body) return res.status(HttpStatus.OK).json({ status: HttpStatus.OK })
    return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, body })
  }

  public ok<T = unknown>(res: Response, body?: T) {
    if (!body) return res.status(HttpStatus.OK).json({ status: HttpStatus.OK })
    else return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, body })
  }

  public created<T = unknown>(res: Response, body?: T) {
    if (!body)
      return res.status(HttpStatus.CREATED).json({ status: HttpStatus.CREATED })
    else
      return res
        .status(HttpStatus.CREATED)
        .json({ status: HttpStatus.CREATED, body })
  }

  public badRequest(res: Response, message?: string, errors?: unknown) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: message ?? 'Bad request',
      errors: errors ?? undefined,
    })
  }

  public notFound(res: Response, message?: string) {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      message: message ?? 'Not found',
    })
  }

  public tooMany(res: Response, message?: string) {
    return res.status(HttpStatus.TOO_MANY_REQUESTS).json({
      status: HttpStatus.TOO_MANY_REQUESTS,
      message: message ?? 'Too many requests',
    })
  }

  public unprocessable(res: Response, message?: string) {
    return res.status(HttpStatus.UNPROCESSABLE_CONTENT).json({
      status: HttpStatus.UNPROCESSABLE_CONTENT,
      message: message ?? 'Unprocessable content',
    })
  }

  public preconditionFailed(res: Response, message?: string) {
    return res.status(HttpStatus.PRECONDITION_FAILED).json({
      status: HttpStatus.PRECONDITION_FAILED,
      message: message ?? 'Precondition failed',
    })
  }

  public conflict(res: Response, message?: string) {
    return res.status(HttpStatus.CONFLICT).json({
      status: HttpStatus.CONFLICT,
      message: message ?? 'Conflict',
    })
  }

  public notImplemented(res: Response) {
    return res.status(HttpStatus.NOT_IMPLEMENTED).json({
      status: HttpStatus.NOT_IMPLEMENTED,
      message: 'Not implemented',
    })
  }

  protected validationError(
    res: Response,
    error: ExpressValidationError
  ): Response {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      code: error.name,
      message: 'Bad Request',
      errors: error.serialize(),
    })
  }

  public fail(res: Response, error?: Error | string) {
    // this.logger.debug('BaseController (L128) Fail', error)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error?.toString() ?? 'Internal server error',
    })
  }
}

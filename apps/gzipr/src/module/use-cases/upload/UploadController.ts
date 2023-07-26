import { check } from 'express-validator'
import { Request, Response } from 'express'

import { UploadUseCase } from './UploadUseCase'
import { Logger, BaseController, ExpressValidationError } from '@gzipr/core'

export class UploadController extends BaseController {
  private readonly useCase: UploadUseCase

  constructor(logger: Logger, useCase: UploadUseCase) {
    super(logger)
    this.useCase = useCase
  }

  protected async validate(req: Request) {
    await Promise.all([check('filename').isString().run(req)])
  }

  protected async handler(req: Request, res: Response) {
    const { filename } = req.params

    try {
      const result = await this.useCase.execute({
        filename,
        headers: req.headers,
        pipe: req.pipe.bind(req),
      })

      if (result.isLeft()) {
        const error = result.left

        console.log('chegou', error.constructor.name)

        switch (error.constructor.name) {
          case 'InvalidHeaders':
          case 'InvalidFileExtension':
          case 'InvalidMimeType':
          case 'InvalidContentType':
          case 'InvalidContentLength':
          case 'InvalidContentEncoding':
          case 'EntityTooLargeError':
            return this.badRequest(res, error.message)
          case 'InvalidGzipFile':
            return this.preconditionFailed(res, error.message)
          case 'ExpressValidationError':
            return this.validationError(res, error as ExpressValidationError)
          default: {
            return this.fail(res, error)
          }
        }
      }

      return this.created(res)
    } catch (error) {
      this.logger.debug('UploadController', error)
      return this.fail(res, error)
    }
  }
}

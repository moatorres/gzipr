import { Request, Response } from 'express'
import { BaseController, Logger } from '@gzipr/core'
import { DownloadUseCase } from './DownloadUseCase'
import { check } from '../../services/ExpressValidator'

export class DownloadController extends BaseController {
  private readonly useCase: DownloadUseCase

  constructor(logger: Logger, useCase: DownloadUseCase) {
    super(logger)
    this.useCase = useCase
  }

  protected validate = async (req: Request) => {
    await Promise.all([check('filename').sanitize().isValidFilename().run(req)])
  }

  public handler = async (req: Request, res: Response) => {
    const { filename } = req.params

    try {
      const result = await this.useCase.execute({ filename })

      if (result.isLeft()) {
        const error = result.left

        switch (error.constructor.name) {
          case 'FileNotFoundError':
            return this.notFound(res, error.message)
          case 'FileValidationError':
            return this.badRequest(res, error.message)
          default:
            return this.fail(res, error)
        }
      } else {
        res.header('Content-Type', 'application/octet-stream')
        res.header('Content-Disposition', `attachment; filename="${filename}"`)

        const readStream = result.right.value as NodeJS.ReadableStream

        try {
          return readStream.pipe(res)
        } catch (error) {
          this.logger.debug('ReadStream Pipe', error)
        }
      }
    } catch (error) {
      this.logger.debug('DownloadController', error)
      return this.fail(res, error)
    }
  }
}

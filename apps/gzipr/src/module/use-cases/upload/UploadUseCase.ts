/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUploadService } from '../../services/FileUploadService'
import {
  ok,
  left,
  right,
  UseCase,
  Either,
  Result,
  Logger,
  UnexpectedError,
  ExpressValidationError,
} from '@gzipr/core'

import { UploadErrors } from './UploadErrors'

type UploadFileDTO = {
  filename: string
  headers: Record<string, any>
  pipe: (destination: any) => any
}

type Response = Either<
  UploadErrors | ExpressValidationError | UnexpectedError,
  Result<void>
>

export class UploadUseCase extends UseCase<UploadFileDTO, Response> {
  private readonly service: FileUploadService

  constructor(logger: Logger, service: FileUploadService) {
    super(logger)
    this.service = service
  }

  async execute(dto: UploadFileDTO): Promise<Response> {
    try {
      const { headers, pipe } = dto

      if (!headers) {
        return left(new UnexpectedError())
      }

      if (!pipe) {
        return left(new UnexpectedError())
      }

      const result = await this.service.upload({ headers, pipe })

      return right(ok(result))
    } catch (error) {
      this.logger.debug('UploadUseCase', error)
      return left(error)
    }
  }
}
